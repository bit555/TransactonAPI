const mongoose = require("mongoose");

const URI =
  "mongodb+srv://himanshu:mongoAtlas@cluster0.j3fru.mongodb.net/transactionDatabase?retryWrites=true&w=majority";

exports.Dbconnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database");
  } catch (err) {
    console.log("error connecting in database");
  }
};
