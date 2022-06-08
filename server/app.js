const express = require("express");
require("dotenv").config();
require("./config/db").connect();
const routes = require("./routes/index");

const PORT = process.env.PORT || 3020;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//API Routes
app.use("/", routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
