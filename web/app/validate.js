module.exports = function (req, res, next) {

  console.warn('run for all routes!');
  // return next();

  let error = new Error('error');
  const secret = req.header('ApiSecret');
  const timestamp = req.header('Timestamp');

  console.log(secret);
  console.log(timestamp);

  if (!secret) {
    error.statusCode = 404;
    error.description = '无效的用户';
    res.send(error);
  } else {
    const code = md5(timestamp, API_KEY);
    console.log('code:');
    console.log(code);

    if (secret !== code) {
      error.statusCode = 404;
      error.description = '无效的用户';
      res.send(error);
    }
  }

  return next();
}