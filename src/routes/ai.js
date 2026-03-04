const Router = require('@koa/router');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = new Router({ prefix: '/api/ai' });

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Chat Assistant Route
router.post('/chat', async (ctx) => {
  const { prompt, currentContext } = ctx.request.body || {};

  if (!prompt) {
    ctx.status = 400;
    ctx.body = { error: 'Missing prompt.' };
    return;
  }

  if (!genAI) {
    ctx.status = 503;
    ctx.body = { error: 'AI is not configured. Set GEMINI_API_KEY in .env.' };
    return;
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const systemPrompt = `You are a terminal AI assistant integrated into a custom IDE.\nThe user is currently looking at this code:\n\n${currentContext || ''}\n\nUser Question: ${prompt}`;

  try {
    const result = await model.generateContent(systemPrompt);
    ctx.body = { response: result.response.text() };
  } catch (error) {
    ctx.status = 502;
    ctx.body = { error: 'Uplink failed.' };
  }
});

// Inline Code Suggestion Route (Triggered on keyboard pause)
router.post('/suggest', async (ctx) => {
  const { codeBeforeCursor, codeAfterCursor } = ctx.request.body || {};
  if (!codeBeforeCursor && !codeAfterCursor) {
    ctx.status = 400;
    ctx.body = { error: 'Missing code context.' };
    return;
  }

  // Placeholder until FIM prompting is implemented.
  ctx.body = { suggestion: '// AI suggested completion here' };
});

module.exports = router;
