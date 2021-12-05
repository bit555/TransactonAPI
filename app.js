const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const handlers = require("./handlers/handlers");
const PORT = process.env.PORT || 4242;
const app = express();
const connectDb = require("./Database/connction");

connectDb.Dbconnection();
app.use(cors());
app.use(bodyParser.json());

app.get("/user/:user/statistics", handlers.getStatisticsOfUserHandler);
app.get("/user/:user", handlers.getTransactionHandler);
app.get("/", handlers.getTransactionHandler);

app.post(
  "/doTransaction",
  handlers.verifyToken,
  handlers.createTransactionHandler
);
app.post("/login", handlers.loginHandler);
app.listen(PORT, () => {
  console.log("listening on PORT ", PORT);
});
