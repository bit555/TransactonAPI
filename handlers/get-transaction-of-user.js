const transaction = require("../Database/dbModel");

exports.getTransactionOfUserHandler = async (req, res) => {
  const reqParams = req.params;
  const username = reqParams.user;
  let debitAmt = 0;
  let creditAmt = 0;
  const debitParam = [
    { $match: { $and: [{ username: username }, { type: "DEBIT" }] } },
    { $group: { _id: null, sum: { $sum: "$amount" } } },
  ];
  const creditParam = [
    { $match: { $and: [{ username: username }, { type: "CREDIT" }] } },
    { $group: { _id: null, sum: { $sum: "$amount" } } },
  ];
  // seee parser
  const debitTransaction = await transaction.aggregate(debitParam);
  console.log(" ====> 11", debitTransaction);
  // console.log(" =====>", JSON.parse(debitTransaction));

  console.log(" debit amounts ", debitTransaction[0]?.sum);
  console.log(" debit amounts type ", typeof debitTransaction[0]?.sum);
  console.log(" debitAmt type ", typeof debitAmt);
  console.log(" debitAmt Value ", debitAmt);

  debitAmt =
    typeof debitTransaction[0]?.sum === "number" ? debitTransaction[0]?.sum : 0;

  console.log("  after debitAmt type ", typeof debitAmt);
  console.log(" afetr  debitAmt Value ", debitAmt);
  const creditTransaction = await transaction.aggregate(creditParam);

  creditAmt =
    typeof creditTransaction[0]?.sum === "number"
      ? creditTransaction[0]?.sum
      : 0;

  console.log("credit amounts :", creditTransaction[0]?.sum);

  const debit2Transaction = await transaction.aggregate([
    { $match: { $and: [{ username: username }, { type: "DEBIT" }] } },
    { $group: { _id: null, sum: { $sum: "$amount" } } },
  ]);
  console.log(debit2Transaction[0].sum);
  if (debitTransaction.length != 0 && creditTransaction.length != 0) {
    res.json({
      netBalance: creditAmt - debitAmt,
      all_credit: creditAmt,
      all_debit: debitAmt,
    });
  } else {
    res.json({ message: "No such transactions exist for this user" });
  }
};
