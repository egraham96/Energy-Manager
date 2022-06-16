const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Inside verifyToken middleware")
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send("You Don't Have Authorization to See this Page");
  } else {
    try {
      console.log("Inside verifyToken try")
      const verifiedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      console.log(verifiedToken)
      req.user = verifiedToken;
      next();
    } catch (err) {
      res
        .status(401)
        .send(
          "You Don't Have Authorization to See this Page. Please Sign in or Register"
        );
    }
  }
};

module.exports = verifyToken;
