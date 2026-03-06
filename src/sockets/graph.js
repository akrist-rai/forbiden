const {
  refreshMainFileGraph,
  getStateSnapshot,
  upsertUser,
  removeUser,
  upsertBlock,
  deleteBlock,
  addFunctionLink,
  removeLink,
  bindBlocksToClass
} = require('../store-graph');

module.exports = (io, socket) => {
  const emitSnapshot = () => {
    io.emit('graph:state', getStateSnapshot());
  };

  socket.on('graph:join', (payload = {}) => {
    const username = typeof payload === 'string' ? payload : payload.username;
    const user = upsertUser(socket.id, username);
    if (!user) return;
    socket.emit('graph:state', getStateSnapshot());
  });

  socket.on('graph:refresh_main', () => {
    refreshMainFileGraph();
    emitSnapshot();
  });

  socket.on('graph:block_upsert', (payload = {}) => {
    const actor = payload.owner || getStateSnapshot().users.find((u) => u.socketId === socket.id)?.username || 'anonymous';
    const block = upsertBlock(payload, actor);
    if (!block) return;
    emitSnapshot();
  });

  socket.on('graph:block_delete', (payload = {}) => {
    const id = typeof payload === 'string' ? payload : payload.id;
    const deleted = deleteBlock(id);
    if (!deleted) return;
    emitSnapshot();
  });

  socket.on('graph:link_add', (payload = {}) => {
    const edge = addFunctionLink(payload);
    if (!edge) return;
    emitSnapshot();
  });

  socket.on('graph:link_remove', (payload = {}) => {
    const id = typeof payload === 'string' ? payload : payload.id;
    const removed = removeLink(id);
    if (!removed) return;
    emitSnapshot();
  });

  socket.on('graph:class_bind', (payload = {}) => {
    const cls = bindBlocksToClass(payload);
    if (!cls) return;
    emitSnapshot();
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    emitSnapshot();
  });
};
