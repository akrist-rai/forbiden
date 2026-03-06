const Router = require('@koa/router');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = new Router({ prefix: '/api/ai' });

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

function trimText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// Health/Readiness check for frontend boot or diagnostics.
router.get('/health', async (ctx) => {
  ctx.body = {
    ok: true,
    provider: 'gemini',
    configured: Boolean(process.env.GEMINI_API_KEY),
    model: DEFAULT_MODEL
  };
});

async function generateGeminiText({ prompt, currentContext = '', modelName = DEFAULT_MODEL }) {
  const client = getGeminiClient();
  if (!client) {
    const err = new Error('AI is not configured. Set GEMINI_API_KEY in .env.');
    err.status = 503;
    throw err;
  }

  const model = client.getGenerativeModel({ model: modelName });
  const mergedPrompt =
    `You are a terminal AI assistant integrated into a custom IDE.\n` +
    `The user is currently looking at this code:\n\n${currentContext}\n\n` +
    `User Question: ${prompt}`;

  const result = await model.generateContent(mergedPrompt);
  return result.response.text();
}

// Chat Assistant Route
router.post('/chat', async (ctx) => {
  const { prompt, currentContext, model } = ctx.request.body || {};
  const cleanPrompt = trimText(prompt);

  if (!cleanPrompt) {
    ctx.status = 400;
    ctx.body = { error: 'Missing prompt.' };
    return;
  }

  try {
    const response = await generateGeminiText({
      prompt: cleanPrompt,
      currentContext: typeof currentContext === 'string' ? currentContext : '',
      modelName: trimText(model) || DEFAULT_MODEL
    });
    ctx.body = { response, model: trimText(model) || DEFAULT_MODEL };
  } catch (error) {
    ctx.status = error.status || 502;
    ctx.body = { error: error.message || 'Uplink failed.' };
  }
});

// Inline code suggestion endpoint powered by Gemini.
router.post('/suggest', async (ctx) => {
  const { codeBeforeCursor, codeAfterCursor, filePath, model } = ctx.request.body || {};
  const before = typeof codeBeforeCursor === 'string' ? codeBeforeCursor : '';
  const after = typeof codeAfterCursor === 'string' ? codeAfterCursor : '';

  if (!before && !after) {
    ctx.status = 400;
    ctx.body = { error: 'Missing code context.' };
    return;
  }

  const prompt =
    `Complete the code at cursor position.\n` +
    `Return only the code snippet to insert (no markdown, no explanation).\n` +
    `File: ${trimText(filePath) || 'unknown'}\n\n` +
    `Code before cursor:\n${before}\n\n` +
    `Code after cursor:\n${after}\n`;

  try {
    const suggestion = await generateGeminiText({
      prompt,
      currentContext: `${before}<CURSOR>${after}`,
      modelName: trimText(model) || DEFAULT_MODEL
    });
    ctx.body = { suggestion };
  } catch (error) {
    ctx.status = error.status || 502;
    ctx.body = { error: error.message || 'Suggestion uplink failed.' };
  }
});

module.exports = router;
