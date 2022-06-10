const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db=require("./config/db")
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(db)

//API Routes
app.use("/", routes);

const PORT = process.env.PORT || 3020;

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
)
