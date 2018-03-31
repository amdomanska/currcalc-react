const express = require('express');
const path = require('path');
const open = require('open');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');

let getAsync, setAsync
if (process.env.REDIS_URL) {
  const {promisify} = require('util');
  const redis = require('redis').createClient(process.env.REDIS_URL);
  getAsync = promisify(redis.get).bind(redis);
  setAsync = promisify(redis.set).bind(redis);
} else {
  console.log('Missing REDIS_URL. Not using cache.')
}

const app = express();
const port = process.env.PORT || 5000; // eslint-disable-line

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
.use(express.static('public'));

app.get('/rates', async function (req, res) {
  // check cache
  if (getAsync) {
    const cachedRates = await getAsync('rates')
    if (cachedRates) {
      console.log(`cache hit: ${cachedRates}`)
      return res.send({rates: JSON.parse(cachedRates)})
    }
  }

  try {
    console.log('fetching rates')
    const response = await fetch('https://api.fixer.io/latest')
    const json = await response.json()
    const rates = json.rates
    rates['EUR'] = 1
    if (setAsync) {
      await setAsync('rates', JSON.stringify(rates), 'EX', 60) // expire cache after 10s
    }
    res.send({rates})
  } catch (err) {
    console.error(`error getting rates: ${err}`)
    res.status(500)
  }
})

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', req.originalUrl));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
