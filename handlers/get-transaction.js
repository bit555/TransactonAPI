const ddbaccessor = require("../accessors/db-accessor");
const { isEmpty, isNotBlank } = require("../commons/helper");
const responses = require("../accessors/responses");

exports.getTransactionHandler = async (req, res) => {
  const url = req.url;
  const reqParams = req.params;
  const username = reqParams.user;
  let result;
  console.log(url);
  try {
    validate(reqParams);
    if (url.includes("/user")) {
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
