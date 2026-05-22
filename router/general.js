const express = require('express');
const axios = require('axios');

const public_users = express.Router();

let books = {
  "1": {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {
      guest: "Excellent book"
    }
  },
  "2": {
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {
      guest: "Very interesting"
    }
  }
};

public_users.get('/', function (req, res) {

  return res.status(200).json(books);

});

public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);

});

public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  const filtered = Object.values(books).filter(
    book => book.author === author
  );

  return res.status(200).json(filtered);

});

public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  const filtered = Object.values(books).filter(
    book => book.title === title
  );

  return res.status(200).json(filtered);

});

public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(
    books[isbn].reviews
  );

});

public_users.get('/asyncbooks', async function (req, res) {

  const response = await axios.get(
    'http://localhost:5000/'
  );

  return res.status(200).json(response.data);

});

public_users.get('/promiseisbn/:isbn', function (req, res) {

  axios
    .get(`http://localhost:5000/isbn/${req.params.isbn}`)
    .then(response => {

      res.status(200).json(response.data);

    });

});

public_users.get('/promiseauthor/:author', function (req, res) {

  axios
    .get(`http://localhost:5000/author/${req.params.author}`)
    .then(response => {

      res.status(200).json(response.data);

    });

});

public_users.get('/promisetitle/:title', function (req, res) {

  axios
    .get(`http://localhost:5000/title/${req.params.title}`)
    .then(response => {

      res.status(200).json(response.data);

    });

});

module.exports.general = public_users;