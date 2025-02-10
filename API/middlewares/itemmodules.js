const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise')();

function getItems(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.manyOrNone(
    //'SELECT * FROM items WHERE company_id = $1',
    'select i.item_type_id, i.item_id, i.name, it.item_type_name, i.amount, i.company_id from items i inner join item_types it on i.item_type_id = it.item_type_id where i.company_id = $1 group by i.item_type_id, i.name, i.amount, it.item_type_name, i.company_id, i.item_id',

    //'SELECT i.name, i.amount, i.company_id, it.item_type_name, i.item_type_id from items i inner join item_types it on i.item_type_id = it.item_type_id WHERE i.company_id = $1 group by i.company_id, i.amount, i.name, it.item_type_name, i.item_type_id’',
    tokendata.company_id
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function registerItem(req, res) {
  console.log(req);
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
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
  console.log(item);
  db.query('INSERT INTO items (${this:name}) VALUES (${this:csv})', item)
    .then((response) => {
      return res.status(201).json({
        message: 'Vare registrert!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: 'Oops, noe gikk galt!',
        result: error,
        error: error,
      });
    });
}

function updateItem(req, res) {
  const condition = pgp.as.format(' where item_id = ${item_id}', req.body);
  const query =
    pgp.helpers.update(req.body, ['name', 'item_type_id', 'amount'], 'items') +
    condition;
  db.query(query)
    .then((data) => {
      res.status(200).json({
        msg: 'Item oppdatert',
      });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteItem(req, res) {
  db.result('DELETE FROM items WHERE item_id = $1', req.params.id)
    .then((data) => {
      res.status(200).json({
        status: 'Item slettet',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function getSingleItem(req, res) {
  db.oneOrNone('SELECT * FROM items WHERE item_id = $1', req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function registerItemType(req, res) {
  console.log(req);
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  const {
    body: { item_type_name },
    body: { description },
  } = req;
  const itemtype = {
    item_type_name: item_type_name,
    description: description,
    company_id: tokendata.company_id,
  };
  console.log(itemtype);
  db.query(
    'INSERT INTO item_types (${this:name}) VALUES (${this:csv})',
    itemtype
  )
    .then((response) => {
      return res.status(201).json({
        message: 'Varetype registrert!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: 'Oops, noe gikk galt!',
        result: error,
        error: error,
      });
    });
}

/* function getItemTypes(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.manyOrNone(
    'SELECT * FROM item_types WHERE company_id = $1',
    tokendata.company_id
  )
    .then(data => {
      return res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieve all items'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json(err);
    });
} */

function getItemTypes(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.manyOrNone(
    //´´'SELECT * from item_types where company_id = $1',
    //'SELECT it.item_type_id, it.item_type_name, sum(i.amount) as total from item_types it, items i where i.company_id = $1 group by it.item_type_id, it.item_type_name',
    'select i.item_type_id, it.item_type_name, it.description, it.company_id , sum(i.amount) as total from items i inner join item_types it on i.item_type_id = it.item_type_id where i.company_id = $1 group by i.item_type_id, it.item_type_name, it.description, it.company_id ',
    //'SELECT i.item_type_id, SUM(amount) as total FROM items i GROUP BY i.item_type_id',

    //'SELECT i.item_type_id, it.item_type_name, i.company_id, sum(i.amount) as total from items i inner join item_types it on i.item_type_id = it.item_type_id WHERE i.company_id = $1 group by it.item_type_name, i.item_type_id, i.company_id',
    tokendata.company_id
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

function getItemTypesName(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.manyOrNone(
    'SELECT * from item_types where company_id = $1 ',
    tokendata.company_id
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

function updateItemType(req, res) {
  const condition = pgp.as.format(
    ' where item_type_id = ${item_type_id}',
    req.body
  );
  const query =
    pgp.helpers.update(
      req.body,
      ['item_type_name', 'description'],
      'item_types'
    ) + condition;
  db.query(query)
    .then((data) => {
      res.status(200).json({
        status: 'success',
        msg: data,
      });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteItemType(req, res) {
  //db.result('DELETE FROM item_types WHERE item_type_id = $1', req.params.id)

  db.result(
    'DELETE from items i using item_types it where i.item_type_id = it.item_type_id and it.item_type_id = $1; delete from item_types it where it.item_type_id = $1',
    req.params.id
  )
    .then((data) => {
      res.status(200).json({
        status: 'Itemtype deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function getSingleItemType(req, res) {
  db.oneOrNone(
    'SELECT * FROM item_types WHERE item_type_id = $1',
    req.params.id
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function getItem(req, res) {
  await db
    .oneOrNone('SELECT * FROM items WHERE item_id = $1', req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

async function getItemType(req, res) {
  await db
    .oneOrNone(
      'SELECT * FROM item_types WHERE item_type_id = $1',
      req.params.id
    )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

module.exports = {
  getItem,
  getItemType,
  getItems,
  registerItem,
  registerItemType,
  updateItem,
  deleteItem,
  getItemTypes,
  updateItemType,
  deleteItemType,
  getItemTypesName,
  getSingleItemType,
  getSingleItem,
};
