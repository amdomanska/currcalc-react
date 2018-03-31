const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

let getAsync, setAsync;
if (process.env.REDIS_URL) {
  const {promisify} = require('util');
  const redis = require('redis').createClient(process.env.REDIS_URL);
  getAsync = promisify(redis.get).bind(redis);
  setAsync = promisify(redis.set).bind(redis);
} else {
  console.log('Missing REDIS_URL. Not using cache.');
}

const app = express();
const port = process.env.PORT || 5000; // eslint-disable-line

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
  .use(express.static('public'));

app.get('/rates', async function (req, res) {
  // check cache
  let rates = null;

  if (getAsync) {
    const cachedRates = await getAsync('rates');
    if (cachedRates) {
      rates = JSON.parse(cachedRates);
      res.header('Cache-Control', 'public, max-age=10');
      res.send({rates: rates});
    } else {
      try {
        console.log('fetching rates');
        const response = await fetch('https://api.fixer.io/latest');
        const json = await response.json();
        rates = json.rates;
        rates['EUR'] = 1;
        if (setAsync) {
          await setAsync('rates', JSON.stringify(rates), 'EX', 60); // expire cache after 60s
        }
        res.header('Cache-Control', 'public, max-age=10');
        res.send({rates: rates});
      } catch (err) {
        console.error(`error getting rates: ${err}`);
        console.log(res);
        res.status(500);
      }
    }
  }
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', req.originalUrl));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
