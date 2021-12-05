const { RESPONSE_CODES } = require("../commons/constants");

exports.buildErrorResponse = (response, error) => {
  console.log("response-builder.js: Error response", error);
  let errorCode = error.status
    ? error.status
    : RESPONSE_CODES.INTERNAL_SERVER_ERROR;
  response.statusCode = errorCode;
  response.json({
    error: {
      code: errorCode,
      name: error.name,
      message: error.message,
    },
  });
  return response;
};

exports.buildSuccessResponse = (response, result) => {
  console.log("response-builder.js :success response", result);
  response.statusCode = RESPONSE_CODES.SUCCESS;
  response.json({
    success: "success",
    result: result,
  });

  return response;
};
