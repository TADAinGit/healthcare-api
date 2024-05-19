// src/config/socketio.js
const socketIo = require("socket.io");
const logger = require("../config/logger");

function setupSocket(server) {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    logger.info("A new client connected");

    socket.on("joinChunk", (chunkId) => {
      socket.join(chunkId);
      logger.info(`Client ${socket.id} joined chunk of patient: ${chunkId}`);
    });

    socket.on("sendSensorData", (chunkId, data) => {
      try {
        socket.to(chunkId).emit("sensorData", data);
        // TODO: Handle data from sensor here
        logger.info(`Client ${socket.id} sent data: ${JSON.stringify(data)}`);
      } catch (error) {
        logger.error(`Error sending data: ${error.message}`);
      }
    });

    socket.on("leaveChunk", (chunkId) => {
      socket.leave(chunkId);
      logger.info(`Client ${socket.id} left chunk ${chunkId}`);
    });

    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  });

  return io;
}

module.exports = setupSocket;
