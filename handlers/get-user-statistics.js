const { isZero, isNotBlank } = require("../commons/helper");
const ddbaccessor = require("../accessors/db-accessor");
const responses = require("../accessors/responses");
const { BadRequestError, InternalServerError } = require("../commons/errors");

exports.getUserStatisticsHandler = async (req, res) => {
  const reqParams = req.params;
  const username = reqParams.user;
  let debitAmount;
  let creditAmount;
  let balance;

  try {
    validate(reqParams);
    debitAmount = await ddbaccessor.getSumAmtBasedOnType(username, "DEBIT");
    creditAmount = await ddbaccessor.getSumAmtBasedOnType(username, "CREDIT");
    if (isZero(debitAmount) && isZero(creditAmount)) {
      throw InternalServerError("user not exists");
    } else {
      balance = {
        net_balance: creditAmount - debitAmount,
        amount_credited: creditAmount,
        amount_debited: debitAmount,
      };
    }
  } catch (error) {
    return responses.buildErrorResponse(res, error);
  }
  return responses.buildSuccessResponse(res, balance);
};

const validate = (input) => {
  if (!isNotBlank(input.user)) {
    throw new BadRequestError("username is missing");
  }
};
