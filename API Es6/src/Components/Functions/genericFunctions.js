import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';
import bcrypt from 'bcrypt';

const getCompanyId = async (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  return tokendata.company_id;
};

const getAll = (table) => async (req, res) => {
  const company_id = await getCompanyId(req);
  await db
    .manyOrNone(`SELECT * FROM ${table} WHERE company_id = $1`, company_id)
    .then((response) => {
      return res.status(200).json({ result: response });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ message: 'kunne ikke hente', error: error });
    });
};

const getById = (table, entity) => async (req, res) => {
  const entity_id = req.params.id;
  const company_id = await getCompanyId(req);
  await db
    .oneOrNone(
      `SELECT * FROM ${table} WHERE ${entity} = $1 AND company_id = $2`,
      [entity_id, company_id]
    )
    .then((response) => {
      return res.status(200).json({ result: response });
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'kunne ikke hente',
        error: error,
      });
    });
};

const update = (table, entity) => async (req, res) => {
  const entity_id = req.params.id;
  const company_id = await getCompanyId(req);
  const pgp = require('pg-promise')();
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }
  const query = pgp.helpers.sets(req.body);
  const condition = pgp.as.format(
    ` WHERE ${entity} = $1 AND company_id = $2 RETURNING ${entity}`,
    [entity_id, company_id]
  );
  await db
    .query(`UPDATE ${table} SET ` + query + condition)
    .then((response) => {
      return res.status(200).json({
        message: 'Oppdatert',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Kunne ikke oppdatere',
      });
    });
};

const deleteFromDb = (table, entity) => async (req, res) => {
  const entity_id = req.params.id;
  const company_id = await getCompanyId(req);
  await db
    .result(
      `DELETE from ${table} where ${entity} = $1 AND company_id = $2 RETURNING ${entity}`,
      [entity_id, company_id]
    )
    .then((response) => {
      res.status(200).json({
        message: 'Slettet',
        result: response,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        message: 'kunne ikke slette',
        error: error,
      });
    });
};

module.exports = {
  getAll,
  getById,
  update,
  deleteFromDb,
};
