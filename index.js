const express = require('express');

const app = express();

const NAME = process.env.NAME || 'undefined';

app.get('/', (request, response) => {
  response.send(`<h1>Hello ${NAME}</h1>`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
