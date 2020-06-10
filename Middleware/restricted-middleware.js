const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const  token = req.headers.authorization.split(" ")[1];;
  
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: err, token:token});
      } else {
        req.decodedJwt = decodedToken;
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.status(401).json({message: 'you shall not pass'});
  }
};