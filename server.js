require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todos", require("./routes/api/todos"));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log("-Server Error-", err);
  }
};

start();
