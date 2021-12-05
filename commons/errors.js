const { RESPONSE_CODES } = require("./constants");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = RESPONSE_CODES.BAD_REQUEST;
    this.message = message;
    Error.captureStackTrace(this, BadRequestError);
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = RESPONSE_CODES.INTERNAL_SERVER_ERROR;
    this.message = message;
    Error.captureStackTrace(this, InternalServerError);
  }
}

module.exports = {
  BadRequestError,
  InternalServerError,
};
