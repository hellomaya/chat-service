const admin = require('firebase-admin');


var serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firecha-56402.firebaseio.com/'
});

module.exports = admin;