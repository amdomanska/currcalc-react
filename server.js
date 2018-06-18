const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const {promisify} = require('util');
const fs = require('fs');

let getAsync, setAsync;
if (process.env.REDIS_URL) {
  console.log(`Using redis at ${process.env.REDIS_URL}`);
  const redis = require('redis').createClient(process.env.REDIS_URL);
  getAsync = promisify(redis.get).bind(redis);
  setAsync = promisify(redis.set).bind(redis);
} else {
  console.log('Missing REDIS_URL. Not using cache.');
}

const app = express();
const port = process.env.PORT || 5000; // eslint-disable-line

app.use(bodyParser.urlencoded({
  extended: true
}))
  .use(express.static('public'));

const CURRENCY_INFO = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data/currencies.json'))
);

app.get('/rates', async function (req, res) {
  let response = null;

  if (getAsync) {
    // check cache
    const cachedResponse = await getAsync('rates');
    if (cachedResponse) {
      response = JSON.parse(cachedResponse);
    }
  }

  if (!response) {
    let rates;
    try {
      console.log('fetching rates...');
      const fixer = await fetch('http://data.fixer.io/api/latest?access_key=664d9f8596fa5a484c02f3ed09f50e1f&format=1');
      const json = await fixer.json();
      rates = json.rates;
    } catch (err) {
      console.error(`error getting rates: ${err}`);
      return res.status(500);
    }

    rates['EUR'] = 1;
    const info = {};
    for (const currency in rates) {
      info[currency] = CURRENCY_INFO[currency];
    }
    response = {rates, info};

    if (setAsync) {
      // update cache
      await setAsync('rates', JSON.stringify(response), 'EX', 60); // expire cache after 60s
    }
  }

  res.header('Cache-Control', 'public, max-age=60');
  res.send(response);
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', req.originalUrl));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
