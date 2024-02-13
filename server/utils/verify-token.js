import jwt from 'jsonwebtoken';

const verifyToken = (token, cb) => {
  if (!token) {
    return cb(null, true)
  }
  jwt.verify(token, process.env?.JWT_SECRET, (err, decoded) => {
    if (err) {
      cb(null, true)
    }
    cb(decoded, false)
  });
};

export default verifyToken;