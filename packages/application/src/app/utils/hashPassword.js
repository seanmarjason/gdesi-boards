const crypto = require('crypto'); 

function hashPassword(password) {
  const iterations = 100000;
  const salt = crypto.randomBytes(128).toString('base64');
  const key = crypto.pbkdf2Sync( password, salt, iterations, 64, 'sha512' )
  const hash = key.toString('hex')

  return { salt, iterations, hash }
}

function isPasswordValid(user, passwordAttempt) {
  const passwordAttemptKey = crypto.pbkdf2Sync( passwordAttempt, user.salt, user.iterations, 64, 'sha512' )
  const passwordAttemptHash = passwordAttemptKey.toString('hex')

  return passwordAttemptHash == user.pwhash
}

export { hashPassword, isPasswordValid }
