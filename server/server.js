const express = require("express");
const mongoose = require("mongoose");
//const path = require('path');
require("dotenv").config();
const routes = require("./routes/index");

const PORT = process.env.PORT || 3020;

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());


mongoose.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Energy-Manager", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
  } catch (err) {
    console.log("Database connection failed. Exiting now...");
    console.error(err.message);
    process.exit(1);
  }
};

//API Routes
server.use("/", routes);

server.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT} 🚀`)
);
