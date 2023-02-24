const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-errors');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (context) {
    let token = context.req.headers.authorization;

    if (token) {
      token = token.split('Bearer ')[1];
    }

    if (!token) {
      throw new AuthenticationError('Authorization header missing');
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch {
      throw new AuthenticationError('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
