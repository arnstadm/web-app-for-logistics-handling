import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';

const getItems = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  db.manyOrNone(
    'select i.item_type_id, i.item_id, i.name, it.item_type_name, i.amount, i.company_id from items i left outer join item_types it on i.item_type_id = it.item_type_id where i.company_id = $1 group by i.item_type_id, i.name, i.amount, it.item_type_name, i.company_id, i.item_id',    //'select * from items where company_id = $1',
    tokendata.company_id
  )
    .then((response) => {
      return res.status(200).json({ items: response });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const getItemById = async (req, res) => {
  db.oneOrNone('SELECT * FROM items WHERE item_id = $1', req.params.id)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const createItem = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const {
    body: { name },
    body: { item_type_id },
    body: { amount },
  } = req;
  const item = {
    name: name,
    item_type_id: item_type_id,
    amount: amount,
    company_id: tokendata.company_id,
  };
  db.query(
    'INSERT INTO items (${this:name}) VALUES (${this:csv}) RETURNING item_id',
    item
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Vare opprettet!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Vare kunne ikke registreres!',
      });
    });
};

const updateItem = async (req, res) => {
  const pgp = require('pg-promise')();
  const query = pgp.helpers.sets(req.body);
  const condition = pgp.as.format(' WHERE item_id = $1', req.params.id);
  db.query('UPDATE items SET ' + query + condition)
    .then((response) => {
      return res.status(200).json({
        message: 'Vare oppdatert!',
        result: response,
      });
    })
    .catch((err) => {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: 'Vare kunne ikke oppdateres',
      });
    });
};

const deleteItem = async (req, res) => {
  const item_id = req.params.id;
  db.result('DELETE FROM items WHERE item_id = $1 RETURNING item_id', item_id)
    .then((response) => {
      res.status(200).json({
        message: 'Vare slettet',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
