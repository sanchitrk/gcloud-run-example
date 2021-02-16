const express = require('express');
const Redis = require('ioredis');

const app = express();

const NAME = process.env.NAME || 'undefined';
const AGE = process.env.AGE || 'undefined';

const REDIS_URL = process.env.REDIS_URL || '127.0.0.1';
const REDIS_PASSWD = process.env.REDIS_PASSWD || 'verySecure';

const redis = new Redis({
  host: REDIS_URL,
  port: 6379,
  password: REDIS_PASSWD,
});

app.get('/', (request, response) => {
  redis.set('platform', 'nodejs').then((res) => {
    if (res === 'OK') console.log('key is set');
  });

  redis.get('platform').then((res) => {
    console.log('platform', res);
    response.status(200).json({
      server: res,
      name: NAME,
      age: AGE,
    });
  }).catch((err) => {
    console.log('err setting up key in redis');
    console.log(err.message);
    response.status(404).json({
      msg: err.message,
      name: NAME,
      age: AGE,
    });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
