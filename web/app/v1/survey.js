const Parse = require('parse/node');
const base64 = require('base-64');

Parse.initialize("x1Hq7GDOuklazEqJ2iuwxKY3QS6sAzKSM0n");
Parse.serverURL = 'http://localhost:1337/parse';

class Survey extends Parse.Object {
  constructor() {
    super('Survey');
  }
}

// Parse.Object.registerSubclass('Survey', Survey);

function create(data) {

  if (!data) {
    return;
  }

  let survey = new Survey();

  survey.set("survey", JSON.stringify(data.survey));
  survey.set("deviceId", data.deviceId);
  survey.set("memo", data.memo);

  // console.log(decodeURI(base64.decode(data.memo)));

  survey.save(null, {
    success: function (gameScore) {
      // Execute any logic that should take place after the object is saved.

      console.log('New object created with objectId: ' + gameScore.id);
    },
    error: function (gameScore, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log('Failed to create new object, with error code: ' + error.message);
    }
  });
}

exports.init = function (server) {
  server.get('/api/v1/survey/', function (req, res, next) {
    // const error = new Error('abc');
    // error.statusCode = 404;
    res.send('');
    return next();
  });

  server.post('/api/v1/survey/create',
    function (req, res, next) {
      // res.send('hi');
      // console.log(req.params);
      // console.log(req.query);
      // console.log(typeof req.body.data);
      console.log(req.body);
      const data = JSON.parse(req.body);
      create(data);
      res.send({ statusCode: 200, description: 'success' });
      return next();
    });
}
