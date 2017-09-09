const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// mongoose.Promise = require("bluebird")
const Users = require("../models/Users")
const Snippet =require("../models/Snippets")
// const DBUrl = "mongodb://127.0.0.1:27017/snippet"
// mongoose.connect(DBUrl)

//
const requireAuth = function(req, res, next) {
  // console.log(req.session.user);
  if (req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

router.get("/",  requireAuth, function(req, res) {
    console.log("Connected");
    Snippet.find()
    .then(function(newSnippet){
      // console.log(newSnippet);
      res.render("index", {
        newSnippet:newSnippet
      })
    })
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
