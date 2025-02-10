import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';
import bcrypt from 'bcrypt';

const validate = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1] || 'nothing';
  jwt.verify(token, secret, function (error, decoded) {
    if (error) {
      return res.status(400).json({ error: error });
    }
    return res.status(200).json({ token: decoded });
  });
};

const signIn = async (req, res) => {
  const {
    body: { password },
    body: { email },
  } = req;

  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE email = $1',
    email
  );
  if (!user) {
    return res.status(400).json({
      message: 'Feil brukernavn eller passord',
    });
  }
  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return res.status(400).json({
      message: 'Feil brukernavn eller passord',
    });
  }
  const jwtToken = jwt.sign(
    {
      email: user.email,
      user_id: user.user_id,
      company_id: user.company_id,
      company_name: user.company_name,
      user_level: user.user_level,
      phone_number: user.phone_number,
    },
    'longer-secret-is-better',
    {
      expiresIn: '3h',
    }
  );
  return res.status(200).json({
    token: jwtToken,
    expiresIn: 3600,
    user_id: user.user_id,
    company_id: user.company_id,
  });
};

module.exports = {
  validate,
  signIn,
};
