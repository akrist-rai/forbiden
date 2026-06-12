/**
 * AI Routes (Phase 6.1)
 *
 * POST /api/ai/chat — topology-aware Gemini conversation
 *
 * Uses Google Gemini 2.0 Flash (free tier available).
 * Get a key at: https://aistudio.google.com/apikey
 * Set GEMINI_API_KEY in your .env — no billing required for the free tier.
 */

import Router from '@koa/router';
import { z } from 'zod';

const aiRoutes = new Router();

const ChatSchema = z.object({
  messages: z.array(z.object({
    role:    z.enum(['user', 'assistant']),
    content: z.string().max(8_000),
  })).min(1).max(40),
  system: z.string().max(4_000).optional(),
});

aiRoutes.post('/chat', async (ctx) => {
  const { messages, system } = ChatSchema.parse(ctx.request.body);

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    ctx.status = 503;
    ctx.body = { error: 'AI not configured — set GEMINI_API_KEY (free at aistudio.google.com/apikey)' };
    return;
  }

  // Gemini uses role: user | model  (map our 'assistant' → 'model')
  const contents = messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
  };
  if (system) body['systemInstruction'] = { parts: [{ text: system }] };

  const model = 'gemini-2.0-flash';
  const url   = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const resp = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.text().catch(() => 'unknown error');
    ctx.status = resp.status;
    ctx.body = { error: `Gemini API error: ${err}` };
    return;
  }

  const data = await resp.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  ctx.body = { reply };
});

export default aiRoutes;
