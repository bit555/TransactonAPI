const transaction = require("../Database/dbModel");

exports.getTransactionHandler = async (req, res) => {
  const url = req.url;
  console.log(url);

  if (req.url === "/") {
    const alltransaction = await transaction.find().select({
      username: 1,
      amount: 1,
      type: 1,
      currency: 1,
      status: 1,
      timestamp: 1,
    });

    res.json(alltransaction);
  } else if (url.includes("/user")) {
    // user:user get all transcaction of particular user
    const reqParams = req.params;
    const username = reqParams.user;
    // all trs of pec user
    const userTransaction = await transaction.find({ username }).select({
      username: 1,
      amount: 1,
      type: 1,
      currency: 1,
      status: 1,
      timestamp: 1,
    });
    if (userTransaction.length != 0) {
      res.json(userTransaction);
    } else {
      res.json({ message: "No transactions exist for this user" });
    }
  }
};
