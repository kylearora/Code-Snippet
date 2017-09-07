const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
const bcrypt = require("bcryptjs")

router.get("/login", function(req, res){
  res.render("welcome")
})

router.post("/login", function(req, res) {
  const username = req.body.username
  const password = req.body.password

  Users.findOne({username: username}).then(function(user) {
    if (!user) {
      // no user found, try again
      res.render("welcome", {
        message: "Your info is wrong, FOOL!"
      })
    } else {
      //if user found, redirect to root --> index
      if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.user = user
        res.redirect("/")
      } else {
        // if no user is found, try again
        res.render("welcome", {
          message: "Your info is wrong, FOOL!"
        })
      }
    }
  })
})

module.exports = router
