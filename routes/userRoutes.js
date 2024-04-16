const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/user");
//const catchAsync = require("../utils/CatchAsync");
// const ExpressErrors = require("../utils/ExpressErrors");
// const { campgroundSchema } = require("../joiSchema");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

module.exports = router;
