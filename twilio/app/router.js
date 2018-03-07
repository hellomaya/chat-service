const Router = require('express').Router;
const router = new Router();

router.get('/hello', function (req, res) {
  res.render('console/index.html')
  res.send('Hello')
});


module.exports = router;
