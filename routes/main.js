const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// mongoose.Promise = require("bluebird")
const Users = require("../models/Users")
// const DBUrl = "mongodb://127.0.0.1:27017/snippet"
// mongoose.connect(DBUrl)

router.get("/", function(req, res){
  res.redirect("/welcome")
})

router.get("/welcome", function(req, res){
  res.render("welcome")
})

router.get("/login", function(req, res){
  res.render("login")
})

router.get("/register", function(req,res){
  res.render("register")
})

router.post("/register", function(req,res) {
  const name = req.body.name
  const email= req.body.email
  const username = req.body.username
  const password = req.body.password
  const user = new Users()
  user.name = name
  user.email = email
  user.username = username
  user.passwordHash = bcrypt.hashSync(password, 8)
  user.save().then(function(user) {
    // req.session.user = user
    res.redirect("/")
  })
  .catch(function(error){
    res.render("register", {
      user:user,
      errorMessage: "You need more info, DAWG",
      error: error.errors
    })
  })
})

module.exports = router
