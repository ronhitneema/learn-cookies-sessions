const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "SOMESECRET", // Use environment variable for production
    cookie: {
      httpOnly: true,
      secure: true, // Set to false if testing without HTTPS
      sameSite: 'lax' // Can be 'strict' or 'lax'
    },
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", (req, res) => {
  let name = "Guest";

  if (req.session.user) {
    name = req.session.user;
  }

  res.send(`
    <h1>Welcome, ${name}</h1>
    <form action="/register" method="POST">
      <input type="text" name="name" placeholder="Your name">
      <button>Submit</button>
    </form>
    <form action="/forget" method="POST">
      <button>Logout</button>
    </form>
  `);
});

app.post("/register", (req, res) => {
  // Sanitize and validate input before using
  const userName = req.body.name.trim();
  if (userName) {
    req.session.user = userName;
    res.send(`<p>Thank you</p> <a href="/">Back home</a>`);
  } else {
    res.send("Invalid name");
  }
});

app.post("/forget", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      // Handle error
      return res.send("Error in session destruction");
    }
    res.redirect("/");
  });
});

app.listen(8000);
