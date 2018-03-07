function login(server) {

}

function logout(server) {

}

function createUser(firebase, user, cb) {
  // see if the user is correct
  console.log(user);
  // return;


  firebase.auth().createUser({
    email: user.email,
    emailVerified: false,
    role: user.role,
    // phoneNumber: "+11234567890",
    password: user.password,
    address: user.address,
    // displayName: "John Doe",
    // photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      cb(false, userRecord);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      cb(true, error.message);
    });
  
}


exports.init = function (server, firebase) {
  server.get('/api/v1/users', function (req, res, next) {
    res.send('home')
    // const error = new Error('abc');
    // error.statusCode = 404;
    return next();
  });

  server.post('/api/v1/users/create', function (req, res, next) {
      // res.send('hi');
      // console.log(req.params);
      // console.log(req.query);
      // console.log(req.body);
      // req.data = JSON.parse(req.body);
      console.log(req.body);
      console.log(req.body.email);
      const email = req.body.email;
      const password = req.body.password;
      const role = req.body.role;
      const address = req.body.address;
      
      const error = new Error('');
      error.statusCode = 200;
      error.description = 'success';

      createUser(firebase, {
        email,
        password,
        role,
        address
      },
     function (err, result) {
       if (err) {
         error.statusCode = 400;
         error.description = result;
         res.send(error);
       } else {
         error.description = 'success';
         res.send(error);
       }
     });

      // res.send(error);
      return next();
    },
    function (req, res, next) {
      // res.send(req.data[0].title);
      return next();
    }
  );
}