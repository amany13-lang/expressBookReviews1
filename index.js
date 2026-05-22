const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const customers_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

app.use("/customer", customers_routes);
app.use("/", genl_routes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});