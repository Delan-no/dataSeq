// core/server/eventHandle.js

/**
 * gerer les evennemments du serveur https
 * @param {*} server 
 * @param {*} host 
 * @param {*} port 
 */
function handleServerEvent(server, host, port) {
    server.on('error', err => onError(err, port));
    server.on('listening', () => onListening(host, port));
}

const onListening = (host, port) => console.log(`🚀Serveur démarré sur le port ${port} à l'adresse ${host}⚡`, );

function onError(error, port) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + '🚨 Permission non suffisant! 🚨');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + '🚨 Adresse déja utilisée par un autre service! 🚨');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

module.exports = handleServerEvent;
