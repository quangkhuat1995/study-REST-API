let io;

module.exports = {
  init: (httpSever) => {
    io = require("socket.io")(httpSever);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket is not initialized");
    }
    return io;
  },
};
