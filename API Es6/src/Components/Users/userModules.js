import db from '../../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';
import { validationResult } from 'express-validator';

const getMe = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const company_id = tokendata.company_id;
  const user_id = tokendata.user_id;
  await db
    .oneOrNone('SELECT * FROM users WHERE user_id = $1 AND company_id = $2', [
      user_id,
      company_id,
    ])
    .then((response) => {
      return res.status(200).json({ result: response });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const {
    body: { first_name },
    body: { last_name },
    body: { password },
    body: { email },
    body: { user_level },
    body: { phone_number },
  } = req;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    first_name: first_name,
    last_name: last_name,
    password: hashedPassword,
    email: email,
    company_id: tokendata.company_id,
    user_level: user_level,
    phone_number: phone_number,
  };
  db.query(
    'INSERT INTO users (${this:name}) VALUES (${this:csv}) RETURNING user_id',
    user
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Bruker opprettet!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
        message: 'Bruker eksisterer allerede',
      });
    });
};

module.exports = {
  getMe,
  createUser,
};
