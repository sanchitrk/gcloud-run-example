const express = require('express');

const app = express();

const NAME = process.env.NAME || 'undefined';
const AGE = process.env.AGE || 'undefined';

app.get('/', (request, response) => {
  response.send(`<h1>Hello ${NAME} ${AGE}</h1>`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
