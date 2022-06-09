const mongoose = require("mongoose");

// Declaring the database connection function and exporting it to use in app.js
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/energy-manager",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
