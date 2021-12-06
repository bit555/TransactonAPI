const ddbaccessor = require("../accessors/db-accessor");
const { isEmpty, isNotBlank } = require("../commons/helper");
const responses = require("../accessors/responses");
const { BadRequestError, InternalServerError } = require("../commons/errors");

exports.getAllTransactionsHandler = async (req, res) => {
  const url = req.url;
  const reqParams = req.params;
  const username = reqParams.user;
  let result;
  console.log(url);
  try {
    // all transcactions of particular user

    if (url.includes("/user")) {
      validate(reqParams);
      result = await ddbaccessor.getAllTransactionsForUser(username);
    }
    // all transcactions of All users in database
    else result = await ddbaccessor.getAllTransactionInDB();

    if (isEmpty(result))
      throw new InternalServerError(
        "Error! database is empty ! please add some transactions"
      );
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
