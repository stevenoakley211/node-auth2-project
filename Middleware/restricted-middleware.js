const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const  token = req.headers.authorization.split(" ");
  
  if (token) {
    jwt.verify(token[1], secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: err, token:token});
      } else {
        req.decodedJwt = decodedToken;
        console.log(token);
        next();
      }
    })
  } else {
    res.status(401).json({message: 'you shall not pass'});
  }
};