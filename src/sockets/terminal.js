const pty = require('node-pty');

module.exports = (socket) => {
  const shell = process.env.SHELL || '/bin/bash';

  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });

  // Route incoming terminal keystrokes to the host shell
  socket.on('terminal:input', (data) => {
    ptyProcess.write(data);
  });

  // Route host shell output (with ANSI colors) back to the browser
  ptyProcess.onData((data) => {
    socket.emit('terminal:output', data);
  });

  socket.on('disconnect', () => {
    ptyProcess.kill(); // Clean up the terminal process when the user leaves
  });
};