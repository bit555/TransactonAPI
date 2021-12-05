exports.selectParam = {
  username: 1,
  amount: 1,
  type: 1,
  currency: 1,
  status: 1,
  timestamp: 1,
};

exports.RESPONSE_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
};

exports.STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ENABLE: "ENABLE",
  DISABLE: "DISABLE",
  DELETED: "DELETED",
};
