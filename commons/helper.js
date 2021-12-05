exports.isEmpty = (input) => {
  return input.length == 0;
};

exports.errorMsg = (input) => {
  return {
    values: input.value ? input.value : null,
    message: input.msg
      ? input.msg
      : "No transactions exist for this user for below type",
    type: input.type ? input.type : "DEBIT AND CREDIT",
  };
};

exports.validatorErrorMsg = (input) => {
  return {
    values: input.value ? input.value : null,
    message: input.msg
      ? input.msg
      : "No transactions exist for this user for below type",
    type: input.type ? input.type : "DEBIT AND CREDIT",
  };
};
exports.isNumber = (input) => {
  return typeof input === "number";
};

exports.isZero = (input) => {
  return input === 0;
};

exports.isNotBlank = (input) => {
  return input && input !== "";
};

exports.isCurrency = (input) => {
  return input && (input === "INR" || "USD" || "EURO");
};

exports.isvalidType = (input) => {
  return input && (input === "CREDIT" || "DEBIT");
};
exports.isvalidStatus = (input) => {
  return input && (input === "COMPLETE" || "INPROGRESS");
};
