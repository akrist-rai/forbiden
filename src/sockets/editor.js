module.exports = (io, socket, activeUsers) => {
  
  socket.on('editor:join', (username) => {
    const safeUsername = typeof username === 'string' ? username.trim() : '';
    if (!safeUsername) return;

    activeUsers.set(socket.id, { username: safeUsername, activeFile: null, currentLine: null });
    io.emit('system:users_update', Array.from(activeUsers.values()));
    console.log(`[>] ${safeUsername} joined the network.`);
  });

  // The Marathon Green Bar feature
  socket.on('editor:cursor_move', (data) => {
    if (!data || typeof data !== 'object') return;
    if (typeof data.file !== 'string') return;
    if (typeof data.line !== 'number' || !Number.isFinite(data.line)) return;

    const user = activeUsers.get(socket.id);
    if (user) {
      user.activeFile = data.file;
      user.currentLine = Math.max(1, Math.floor(data.line));

      // Keep the presence panel in sync for everyone.
      io.emit('system:users_update', Array.from(activeUsers.values()));

      // Broadcast to everyone else to highlight this line
      socket.broadcast.emit('editor:remote_cursor', {
        username: user.username,
        file: data.file,
        line: user.currentLine
      });
    }
  });

  socket.on('editor:code_change', (data) => {
    if (!data || typeof data !== 'object') return;
    if (typeof data.file !== 'string' || typeof data.code !== 'string') return;
    socket.broadcast.emit('editor:sync_code', data);
  });

  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      activeUsers.delete(socket.id);
      io.emit('system:users_update', Array.from(activeUsers.values()));
      console.log(`[-] ${user.username} disconnected.`);
    }
  });
};
