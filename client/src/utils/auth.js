const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  }
  throw new AuthenticationError('Authorization header must be provided');
};

module.exports = authMiddleware;
