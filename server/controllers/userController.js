const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { first_name, last_name, role, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send("User Already Exist. Please Login");
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        first_name,
        last_name,
        role,
        email,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { first_name, last_name, role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.save();

      // return new user
      res.status(201).json({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            token: token,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          token: token,
        });
      } else {
        res.status(400).send("Incorrect Password");
      }
    } else {
      res.status(400).send("Please check your email address");
    }
  } catch (err) {
    console.log(err);
  }
};

const verify = (req, res) => {
  res.status(200).send("Token is valid");
};

module.exports = { register, login, verify };
