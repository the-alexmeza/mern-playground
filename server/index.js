require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE);
const UserModel = require("./models/Users");

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("Server running");
});
