const express = require('express');
const bodyparser = require('body-parser');
const { User, Login, Category, Posts } = require('./controller');
const { joiError } = require('./controller/middlewares');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());

app.use('/user', User);
app.use('/login', Login);
app.use('/categories', Category);
app.use('/post', Posts);
app.use(joiError);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

module.export = app;