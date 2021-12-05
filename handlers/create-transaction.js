const ddbaccessor = require("../accessors/db-accessor");
const jwt = require("jsonwebtoken");
const responses = require("../accessors/responses");
const { BadRequestError } = require("../commons/errors");
const {
  isNumber,
  isNotBlank,
  isvalidStatus,
  isvalidType,
  isCurrency,
} = require("../commons/helper");

exports.createTransactionHandler = async (req, res) => {
  const requestBody = req.body;
  const token = req.token;
  let tokenVeriy;
  console.log("requestBody", requestBody);
  const { username, amount, type } = requestBody;
  let result;
  let userBalance;

  try {
    tokenVeriy = await jwt.verify(token, "APIsecretkey");
    console.log(tokenVeriy);
    validate(requestBody);

    if (type === "DEBIT") {
      userBalance = await ddbaccessor.getNetbalance(username);
      if (amount > userBalance) {
        throw new BadRequestError(
          " can't debit amount ! net balance is not sufficient"
        );
      }
    }
    result = await ddbaccessor.putTransaction(requestBody);
  } catch (error) {
    return responses.buildErrorResponse(res, error);
  }
  return responses.buildSuccessResponse(res, result);
};

const validate = (input) => {
  if (!isNotBlank(input.username)) {
    throw new BadRequestError("username is missing");
  }
  if (!isNumber(input.amount)) {
    throw new BadRequestError("amount is missing");
  }
  if (!isCurrency(input.currency)) {
    throw new BadRequestError("currency is missing");
  }
  if (!isvalidType(input.type)) {
    throw new BadRequestError("type is missing");
  }
  if (!isvalidStatus(input.status)) {
    throw new BadRequestError("status is missing");
  }
};
