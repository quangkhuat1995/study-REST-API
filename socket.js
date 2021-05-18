let io;

module.exports = {
  init: (httpSever) => {
    io = require("socket.io")(httpSever, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket is not initialized");
    }
    return io;
  },
};
