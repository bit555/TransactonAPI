const { selectParam } = require("../commons/constants");
const { InternalServerError } = require("../commons/errors");
const { isEmpty, errorMsg, isNumber, isZero } = require("../commons/helper");
const transaction = require("../Database/dbModel");

exports.getAllTransactionInDB = async () => {
  let transactions;

  try {
    transactions = await transaction.find().select(selectParam);
  } catch (error) {
    throw new InternalServerError("error in fetching data");
  }
  return transactions;
};

exports.getAllTransactionsForUser = async (username) => {
  let transactions;

  try {
    transactions = await transaction.find({ username }).select(selectParam);
  } catch (error) {
    throw new InternalServerError(
      `error in fetching data for user ${username}`
    );
  }
  return transactions;
};

exports.getSumAmtBasedOnType = async (username, type) => {
  let typeTransactions;
  let amountSum = 0;
  const typeParam = [
    { $match: { $and: [{ username: username }, { type: type }] } },
    { $group: { _id: null, sum: { $sum: "$amount" } } },
  ];
  try {
    typeTransactions = await transaction.aggregate(typeParam);
    const trxnValue = typeTransactions[0]?.sum;
    if (!isEmpty(typeTransactions)) {
      amountSum = isNumber(trxnValue) ? trxnValue : 0;
    }
  } catch (error) {
    throw new InternalServerError(
      `error , ca'nt get total amount for ${type} of ${username}`
    );
  }
  return amountSum;
};

exports.getNetbalance = async (username) => {
  let debitAmount;
  let creditAmount;
  let netBalance;

  try {
    debitAmount = await this.getSumAmtBasedOnType(username, "DEBIT");
    creditAmount = await this.getSumAmtBasedOnType(username, "CREDIT");
    console.log("debitAmount", debitAmount);
    console.log("creditAmount", creditAmount);
    if (isZero(debitAmount) && isZero(creditAmount)) {
      throw "user not exists";
    } else {
      netBalance = creditAmount - debitAmount;
    }
  } catch (error) {
    throw new InternalServerError(error);
  }
  return netBalance;
};

exports.putTransaction = async (input) => {
  let transactionModel;
  const timeinmillis = Date.now();
  const dbparams = {
    username: input.username,
    type: input.type,
    amount: input.amount,
    currency: input.currency,
    status: input.status,
    timestamp: timeinmillis,
  };

  try {
    transactionModel = new transaction(dbparams);
    await transactionModel.save();
  } catch (error) {
    throw new InternalServerError("error while saving data");
  }
  return transactionModel;
};
