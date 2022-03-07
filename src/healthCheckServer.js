const net = require('net');

// eslint-disable-next-line no-use-before-define
const server = net.createServer(socketHandler);
const logger = require('./handlers/logger');

module.exports = () => {
  // eslint-disable-next-line no-undef
  server.listen(__config.server.healthPort, logger.info(`Started health check server ${__config.server.healthPort}`));
};

function socketHandler(socket) {
  socket.on('data', (data) => {
    logger.debug(`Health check server: Data from client: ${data}`);
    if (data.toString() === 'health') {
      socket.end("I'am up");
    } else {
      socket.end('wrong data received');
    }
  });
  socket.on('error', (e) => {
    logger.error(e);
  });
}
