const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sdjlfnjfjkfsjlklkjss";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => console.log("dbconnected"));

app.get("/test", (req, res) => {
  res.json("test ok node");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const UserDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ UserDoc });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  console.log(userDoc);
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    console.log(passOk);
    if (passOk) {
      const jwt_token = jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret
      );
      console.log(jwt_token);
      res.cookie(jwt_token).status(200).json('login successful')
      // jwt.sign(
      //   { email: userDoc.email, id: userDoc._id },
      //   jwtSecret,
      //   (err, token) => {
      //     if (err) throw err;
      //     res.cookie("token", token).status(200).json("pass ok");
      //     console.log(token);
      //   }
      // );
    } else {
      res.status(422).json("pass not ok");
    }
    res.status(200).json("successful login");
  } else {
    res.status(404).json("email not found");
  }
});

app.listen(4000);
// UfFZvRmykCWY6k7k
// iLVZDhaak6RpdL5y today booking
// 6IQFBnQVdC4Ne7YO booking1
// mongodb+srv://booking1:<password>@cluster0.396gukr.mongodb.net/
