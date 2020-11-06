const isAuthenticated = (req, _res, next) => {
  const { username } = req.session
  if (username === '' || username === null || username === undefined) {
    next(new Error('user is not logged in'))
  } else {
    next()
  }
}

module.exports = isAuthenticated
