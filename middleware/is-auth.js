const jwt = require("jsonwebtoken");

const throwNotAuthenticate = () => {
  const error = new Error("Not authenticated");
  error.statusCode = 401;
  throw error;
};

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throwNotAuthenticate();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  } catch (error) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    throwNotAuthenticate();
  }
  req.userId = decodedToken.userId;
  next();
};
