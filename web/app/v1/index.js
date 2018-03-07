const user = require('./user');
const survey = require('./survey');

module.exports = function (service, firebase) {
  user.init(service, firebase);
}