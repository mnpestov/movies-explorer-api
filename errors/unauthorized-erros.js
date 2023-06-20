const httpConstants = require('http2').constants;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
}
module.exports = UnauthorizedError;
