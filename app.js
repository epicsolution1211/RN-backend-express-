const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
const bodyParser = require("body-parser");

const User = require('./models/user');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//You should use body-parser module. this is for req and res. you can check this on x-www-fprm-.. on postman>

app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}:port is listening`);
});
