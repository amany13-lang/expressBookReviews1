const express = require('express');
const jwt = require('jsonwebtoken');

const regd_users = express.Router();

let users = [];

let books = {
  "1": {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {}
  },
  "2": {
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {}
  }
};

const isValid = (username) => {
  return users.find((user) => user.username === username);
};

regd_users.post("/register", (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({
      message: "Unable to register user"
    });
  }

  if (isValid(username)) {
    return res.status(404).json({
      message: "User already exists"
    });
  }

  users.push({
    username,
    password
  });

  return res.status(200).json({
    message: "User registered successfully"
  });

});

regd_users.post("/login", (req, res) => {

  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(208).json({
      message: "Invalid Login"
    });
  }

  let accessToken = jwt.sign(
    {
      data: password
    },
    'access',
    { expiresIn: 60 * 60 }
  );

  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({
    message: "User successfully logged in"
  });

});

regd_users.put("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const review = req.query.review;

  const username = req.session.authorization.username;

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review added/updated successfully",
    reviews: books[isbn].reviews
  });

});

regd_users.delete("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;

  const username = req.session.authorization.username;

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Review deleted successfully"
  });

});

module.exports.authenticated = regd_users;