const restify = require('restify');
const apiV1 = require('./app/v1/');
const md5 = require('blueimp-md5');
const validate = require('./app/validate');
const lodash = require('lodash');
const firebase = require('./firebase');

require('dotenv').config();



// const API_KEY = 'dESxanmfASv6Eoh81lnbmfC9VbQqefwb';

API_KEY = process.env.API_KEY;

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

/*
server.use(function (req, res, next) {
  // res.send('hi, it worked');
  if (lodash.startsWith(req.getPath().toLowerCase(), '/api/v1')) {

    let error = new Error('error');
    const secret = req.header('ApiSecret');
    const timestamp = req.header('Timestamp');

    // console.log(secret);
    // console.log(timestamp);

    if (!secret) {
      error.statusCode = 404;
      error.description = 'invalid user';
      res.send(error);
      return;
    } else {
      const code = md5(timestamp, API_KEY);
      // console.log('code:');
      // console.log(code);

      if (secret !== code) {
        error.statusCode = 404;
        error.description = 'invalid user';
        res.send(error);
        return;
      }
    }
  }
  return next();
});

*/

apiV1(server, firebase);


server.get(/\/.*/, restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));


const port = process.env.PORT || 80;

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
