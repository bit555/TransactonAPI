exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    console.log("bearerHeader", bearerHeader);
    const bearer = bearerHeader.split(" ");
    console.log("bearer", bearer);
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res
      .status(403)
      .json({ msg: "Forbidden access ! login  to do transactions" });
  }
};
