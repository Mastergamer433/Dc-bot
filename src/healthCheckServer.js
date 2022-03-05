const net = require('net');

let server = net.createServer(socketHandler);

module.exports = () => {
  server.listen(__config.server.healthPort);
};

function socketHandler(socket) {
  socket.on('data', (data) => {
    if (data === 'health') {
      socket.end("I'am up");
    } else {
      socket.end('wrong data received');
    }
  });
}
