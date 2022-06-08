const mongoose = require("mongoose");

// Declaring the database connection function and exporting it to use in app.js
exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/energy-manager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Successfully connected to database");
  } catch (err) {
    console.log("Database connection failed. Exiting now...");
    console.error(err.message);
    process.exit(1);
  }
};