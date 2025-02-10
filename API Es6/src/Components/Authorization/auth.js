// middlewares/auth.js
import jwt from 'jsonwebtoken';
import secret from './secret';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error });
  }
};
