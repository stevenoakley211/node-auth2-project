function protected(req, res, next) {
    if (req.session && req.session.user) {
      next()
    } else {
      res.status(401).json({ message: 'you have no session here' })
    }
  }

  module.exports = protected