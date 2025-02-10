import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';

const getItemTypes = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  db.manyOrNone(
    'SELECT * FROM item_types where company_id = $1',
    //'select i.item_type_id, it.item_type_name, it.description, it.company_id , sum(i.amount) as total from items i inner join item_types it on i.item_type_id = it.item_type_id where i.company_id = $1 group by i.item_type_id, it.item_type_name, it.description, it.company_id ',
    tokendata.company_id
  )
    .then((response) => {
      return res.status(200).json({ itemtypes: response });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const getItemTypeById = async (req, res) => {
  db.oneOrNone(
    'SELECT * FROM item_types WHERE item_type_id = $1',
    req.params.id
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const createItemType = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const {
    body: { item_type_name },
    body: { description },
  } = req;
  const itemtype = {
    item_type_name: item_type_name,
    description: description,
    company_id: tokendata.company_id,
  };
  db.query(
    'INSERT INTO item_types (${this:name}) VALUES (${this:csv}) RETURNING item_type_id',
    itemtype
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Varetype registrert!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Kunne ikke registrere varetype',
      });
    });
};

const updateItemType = async (req, res) => {
  const pgp = require('pg-promise')();
  const query = pgp.helpers.sets(req.body);
  const condition = pgp.as.format(' WHERE item_type_id = $1', req.params.id);
  db.query('UPDATE item_types SET ' + query + condition)
    .then((response) => {
      return res.status(200).json({
        message: 'Varetype oppdatert!',
        result: response,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: 'Varetype kunne ikke oppdateres',
      });
    });
};

const deleteItemType = async (req, res) => {
  const item_type_id = req.params.id;
  db.result(
    'DELETE from item_types where item_type_id=$1',
    //'DELETE from items i using item_types it where i.item_type_id = it.item_type_id and it.item_type_id = $1; delete from item_types it where it.item_type_id = $1',

    item_type_id
  )
    .then((response) => {
      res.status(200).json({
        message: 'Varetype slettet',
        result: response,
      });
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({ error: error });
    });
};

module.exports = {
  getItemTypes,
  getItemTypeById,
  createItemType,
  updateItemType,
  deleteItemType,
};
