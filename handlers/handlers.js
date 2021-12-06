const createTransactionHandler = require("./create-transaction");
const getAllTransactionsHandler = require("./get-all-transactions");
const getUserStatisticsHandler = require("./get-user-statistics");
const loginHandler = require("./login");
const verifyHandler = require("./verify");
module.exports = {
  ...createTransactionHandler,
  ...getAllTransactionsHandler,
  ...getUserStatisticsHandler,
  ...loginHandler,
  ...verifyHandler,
};
