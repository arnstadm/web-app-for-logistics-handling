import db from '../../db/db.js';
import jwt from 'jsonwebtoken';
import secret from '../Authorization/secret';
import moment from 'moment';

const getProjects = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  db.manyOrNone(
    'SELECT * FROM projects where company_id = $1',
    tokendata.company_id
  )
    .then((response) => {
      return res.status(200).json({ projects: response });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const getProjectById = (req, res) => {
  db.oneOrNone('SELECT * FROM projects WHERE project_id = $1', req.params.id)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const createProject = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, secret);
  const {
    body: { project_number },
    body: { project_name },
    body: { project_description },
  } = req;

  const project = {
    project_name: project_name,
    company_id: tokendata.company_id,
    project_number: project_number,
    project_description: project_description,
  };
  db.query(
    'INSERT INTO projects (${this:name}) VALUES (${this:csv}) RETURNING project_id',
    project
  )
    .then((response) => {
      return res.status(200).json({
        message: 'Prosjekt lagret!',
        result: response,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: 'Kunne ikke lagre prosjekt',
      });
    });
};

const updateProject = (req, res) => {
  const pgp = require('pg-promise')();
  const query = pgp.helpers.sets(req.body);
  const condition = pgp.as.format(' WHERE project_id = $1', req.params.id);
  db.query('UPDATE Projects SET ' + query + condition)
    .then((response) => {
      return res.status(200).json({
        message: 'Prosjekt oppdatert!',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Prosjekt kunne ikke oppdateres',
      });
    });
};

const deleteProject = (req, res) => {
  const project_id = req.params.id;
  db.result(
    'DELETE from projects WHERE project_id = $1 RETURNING project_id',
    project_id
  )
    .then((response) => {
      res.status(200).json({
        message: 'Prosjekt slettet',
        result: response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: 'Prosjekt kunne ikke slettes!',
      });
    });
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
