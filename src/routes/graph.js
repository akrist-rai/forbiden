const Router = require('@koa/router');
const {
  refreshMainFileGraph,
  getStateSnapshot,
  upsertBlock,
  deleteBlock,
  addFunctionLink,
  removeLink,
  bindBlocksToClass
} = require('../store-graph');

const router = new Router({ prefix: '/api/graph' });

router.get('/state', async (ctx) => {
  ctx.body = getStateSnapshot();
});

router.post('/refresh-main', async (ctx) => {
  refreshMainFileGraph();
  ctx.body = { ok: true, state: getStateSnapshot() };
});

router.post('/block', async (ctx) => {
  const block = upsertBlock(ctx.request.body || {}, 'api');
  if (!block) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid block payload.' };
    return;
  }
  ctx.body = { ok: true, block, state: getStateSnapshot() };
});

router.delete('/block/:id', async (ctx) => {
  const ok = deleteBlock(ctx.params.id);
  if (!ok) {
    ctx.status = 404;
    ctx.body = { error: 'Block not found.' };
    return;
  }
  ctx.body = { ok: true, state: getStateSnapshot() };
});

router.post('/link', async (ctx) => {
  const edge = addFunctionLink(ctx.request.body || {});
  if (!edge) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid link payload.' };
    return;
  }
  ctx.body = { ok: true, edge, state: getStateSnapshot() };
});

router.delete('/link/:id', async (ctx) => {
  const ok = removeLink(ctx.params.id);
  if (!ok) {
    ctx.status = 404;
    ctx.body = { error: 'Link not found.' };
    return;
  }
  ctx.body = { ok: true, state: getStateSnapshot() };
});

router.post('/class/bind', async (ctx) => {
  const cls = bindBlocksToClass(ctx.request.body || {});
  ctx.body = { ok: true, classThread: cls, state: getStateSnapshot() };
});

module.exports = router;
