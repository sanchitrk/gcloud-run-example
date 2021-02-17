const express = require('express');
const Redis = require('ioredis');

const app = express();

const { NAME } = process.env;
const { AGE } = process.env;

const { REDIS_URL } = process.env;
const { REDIS_PASSWD } = process.env;

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
      redisUrl: REDIS_URL,
      redisPassword: REDIS_PASSWD,
    });
  }).catch((err) => {
    console.log('err setting up key in redis');
    console.log(err.message);
    response.status(404).json({
      msg: err.message,
      name: NAME,
      age: AGE,
      redisUrl: REDIS_URL,
      redisPassword: REDIS_PASSWD,
    });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
