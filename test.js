const ab = [
  {
    _id: "61aba3ac122bb94aa4880728",
    username: "nakul",
    type: "DEBIT",
    amount: 100,
    currency: "INR",
    status: "INPROGRESS",
    timestamp: 1638638508937,
    __v: 0,
  },
  {
    _id: "61aba3bd122bb94aa488072a",
    username: "nakul",
    type: "DEBIT",
    amount: 200,
    currency: "INR",
    status: "INPROGRESS",
    timestamp: 1638638525931,
    __v: 0,
  },
  {
    _id: "61aba3ce122bb94aa488072c",
    username: "nakul",
    type: "DEBIT",
    amount: 300,
    currency: "INR",
    status: "INPROGRESS",
    timestamp: 1638638542197,
    __v: 0,
  },
  {
    _id: "61aba64d122bb94aa488072f",
    username: "nakul",
    type: "CREDIT",
    amount: 800,
    currency: "INR",
    status: "INPROGRESS",
    timestamp: 1638639181373,
    __v: 0,
  },
  {
    _id: "61aba655122bb94aa4880731",
    username: "nakul",
    type: "CREDIT",
    amount: 200,
    currency: "INR",
    status: "INPROGRESS",
    timestamp: 1638639189918,
    __v: 0,
  },
];
// console.log(ab);

// const cr = []
// const db = []

const br = ab.filter((e) => e.type === "DEBIT");

console.log(br);
