const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DB/db");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use("/api/user", require("./routes/api/user"));
app.use("/api/images", require("./routes/api/images"));

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
