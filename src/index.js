Promise = require('bluebird');  
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const setupSocket = require('./config/websocket');
const http = require('http');
require('./config/mqtt');

// open mongoose connection
mongoose.connect();

const server = http.createServer(app);
setupSocket(server);
server.listen(port, () => logger.info(`Server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
