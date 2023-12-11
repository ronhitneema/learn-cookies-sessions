const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const validUsernames = ['stacy']; // In a real app, this would be replaced by a user database

app.get("/start", (req, res) => {
  const uid = req.query.id;
  // Basic validation for user ID
  if (validUsernames.includes(uid)) {
    // Set cookie with HttpOnly and Secure flags
    res.cookie('user', uid, { httpOnly: true, secure: true });
    res.send("Start Page");
  } else {
    res.send("Invalid User");
  }
});

app.get("/home", (req, res) => {
  let uname = req.cookies['user'];
  if (validUsernames.includes(uname)) {
    res.send("You have logged in! Welcome: " + uname);
  } else {
    res.send("You are not authorized to view this page");
  }
});

app.listen(8000);