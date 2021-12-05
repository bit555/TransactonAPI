const jwt = require("jsonwebtoken");
const responses = require("../accessors/responses");
const { BadRequestError } = require("../commons/errors");
const { isNotBlank } = require("../commons/helper");

exports.loginHandler = async (req, res) => {
  const reqBody = req.body;

  try {
    validate(reqBody);
    const user = {
      username: reqBody.username,
      password: reqBody.password,
    };
    token = await jwt.sign({ user }, "APIsecretkey");
  } catch (error) {
    return responses.buildErrorResponse(res, error);
  }
  return responses.buildSuccessResponse(res, token);
};

const validate = (input) => {
  if (!isNotBlank(input.username)) {
    throw new BadRequestError("username is missing");
  }
  if (!isNotBlank(input.password)) {
    throw new BadRequestError("password is missing");
  }
};
