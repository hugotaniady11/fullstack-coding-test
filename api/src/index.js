const express = require("express");
const session = require('express-session');
const passport = require('passport');
const dotenv = require("dotenv");
const app = express()
const cors = require("cors")

dotenv.config();

const PORT = process.env.PORT
const SECRET = process.env.SECRET_KEY

app.use(cors())
app.use(express.json())

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.get("/api" , (req, res) => {
    res.send("hello word")
})

const userController = require("./user/user.controller")
app.use("/auth", userController)

const postController = require("./post/post.controller")
app.use("/posts", postController)


app.listen(PORT, () => {
    console.log("Express API running in port : " + PORT);
});