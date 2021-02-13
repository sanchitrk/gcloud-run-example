const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
