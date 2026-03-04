module.exports = (io, socket, activeUsers) => {
  
  socket.on('editor:join', (username) => {
    activeUsers.set(socket.id, { username, activeFile: null, currentLine: null });
    io.emit('system:users_update', Array.from(activeUsers.values()));
    console.log(`[>] ${username} joined the network.`);
  });

  // The Marathon Green Bar feature
  socket.on('editor:cursor_move', (data) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      user.activeFile = data.file;
      user.currentLine = data.line;

      // Keep the presence panel in sync for everyone.
      io.emit('system:users_update', Array.from(activeUsers.values()));

      // Broadcast to everyone else to highlight this line
      socket.broadcast.emit('editor:remote_cursor', {
        username: user.username,
        file: data.file,
        line: data.line
      });
    }
  });

  socket.on('editor:code_change', (data) => {
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
