const transaction = require("../Database/dbModel");

exports.createTransactionHandler = async (req, res) => {
  const requestBody = req.body;
  const timeinmillis = Date.now();
  const dbparams = {
    username: requestBody.username,
    type: requestBody.type,
    amount: requestBody.amount,
    currency: requestBody.currency,
    status: requestBody.status,
    timestamp: timeinmillis,
  };
  let transactionModel = new transaction(dbparams);
  const dbvalue = await transactionModel.save();
  console.log(dbvalue);
  res.json(transactionModel);
};
