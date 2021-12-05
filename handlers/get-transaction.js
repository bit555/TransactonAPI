const ddbaccessor = require("../accessors/db-accessor");
const { isEmpty, isNotBlank } = require("../commons/helper");
const responses = require("../accessors/responses");
const { BadRequestError, InternalServerError } = require("../commons/errors");

exports.getTransactionHandler = async (req, res) => {
  const url = req.url;
  const reqParams = req.params;
  const username = reqParams.user;
  let result;
  console.log(url);
  try {
    if (url.includes("/user")) {
      validate(reqParams);
      // all transcaction of particular user
      result = await ddbaccessor.getAllTransactionsForUser(username);
    } else result = await ddbaccessor.getAllTransactionInDB();

    if (isEmpty(result)) throw { value: result };
  } catch (error) {
    return responses.buildErrorResponse(res, error);
  }
  return responses.buildSuccessResponse(res, result);
};

const validate = (input) => {
  if (!isNotBlank(input.user)) {
    throw new BadRequestError("username is missing");
  }
};
