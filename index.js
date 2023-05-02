const express = require("express");

const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/users.route");
const { postRouter } = require("./routes/posts.route");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.get("/home", (req, res) => {
  res.send("Social Media App");
});
app.use("/", userRouter);
app.use("/post", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect with DB", error);
  }
  console.log(`Server is running at port ${process.env.port}`);
});
