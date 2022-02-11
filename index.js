const express = require('express');
const bodyparser = require('body-parser');
const { User } = require('./controller');
const { joiError } = require('./controller/middlewares');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', User);
app.use(joiError);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
