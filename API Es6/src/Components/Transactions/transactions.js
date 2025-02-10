import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';
import moment from 'moment';

const getTransactions = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  db.manyOrNone(
    'SELECT * FROM transactions where company_id = $1',
    tokendata.company_id
  )
    .then((response) => {
      return res.status(200).json({ transactions: response });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const getTransactionById = (req, res) => {
  db.oneOrNone(
    'SELECT * FROM transactions WHERE transaction_id = $1',
    req.params.id
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const createTransaction = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const {
    body: { item_id },
    body: { amount },
    body: { project_id },
  } = req;

  const transaction = {
    item_id: item_id,
    amount: amount,
    project_id: project_id,
    date: moment().format('LLLL'),
    company_id: tokendata.company_id,
    user_id: tokendata.user_id,
  };

  db.query(
    'INSERT INTO transactions (${this:name}) VALUES (${this:csv}) RETURNING transaction_id',
    transaction
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Transaksjon lagret!',
        result: response,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: 'Kunne ikke lagre transaksjon',
      });
    });
};

const updateTransaction = (req, res) => {
  const pgp = require('pg-promise')();
  const query = pgp.helpers.sets(req.body);
  const condition = pgp.as.format(' WHERE transaction_id = $1', req.params.id);
  db.query('UPDATE transactions SET ' + query + condition)
    .then((response) => {
      return res.status(200).json({
        message: 'Transaksjon oppdatert',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Transaksjon kunne ikke oppdateres',
      });
    });
};

const deleteTransaction = (req, res) => {
  const transaction_id = req.params.id;
  db.result(
    'DELETE from transactions WHERE transaction_id = $1 RETURNING transaction_id',
    transaction_id
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Transaksjon slettet',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
