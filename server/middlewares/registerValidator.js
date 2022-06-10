const { body, validationResult } = require("express-validator");

const registerValidator = async (req, res, next) => {
  const validations = [
    body("email").isEmail().withMessage("Please Enter A Valid Email Address"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
      .withMessage("Minimum 8 Characters, Minimum 1 Uppercase, Minimum 1 Number"),
  ];

  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors });
  }
};

module.exports = registerValidator;
