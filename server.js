const express = require('express');
const path = require('path');
const open = require('open');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000; // eslint-disable-line

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
.use(express.static('public'))
.use(session({
  secret: 'curr calc secret',
  resave: false,
  saveUninitialized: true
}));

const zeroParams = () => ({value: 0, currA: 0, currB: 0, rate: 0, result: 0})

app.get('/rates', function (req, res) {
  if (!req.session.passedParams) {
    req.session.passedParams = zeroParams()
  }
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(myJson => {
      let currList = Object.keys(myJson.rates);
      res.send({express: currList});
    });
  });

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', req.originalUrl));
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
