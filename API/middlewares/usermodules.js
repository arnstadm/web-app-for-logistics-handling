const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise')();

async function signIn(req, res) {
  const {
    body: { password },
    body: { email },
  } = req;

  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE email = $1',
    email
  );
  if (!user) {
    return res.status(401).json({
      message: 'Feil brukernavn eller passord',
    });
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  console.log(comparedPassword);
  if (!comparedPassword) {
    return res.status(401).json({
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
}

async function signInBak(req, res) {
  const {
    body: { password },
    body: { email },
  } = req;
  let getUser;
  db.oneOrNone('SELECT * FROM users WHERE email = $1', email)
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Feil brukernavn eller passord',
        });
      }
      getUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Feil brukernavn eller passord',
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          user_id: getUser.user_id,
          company_id: getUser.company_id,
          company_name: getUser.company_name,
          user_level: getUser.user_level,
          phone_number: getUser.phone_number,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        }
      );
      return res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        user_id: getUser.user_id,
        company_id: getUser.company_id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication failed: ' + err,
      });
    });
}

async function getUser(req, res) {
  await db
    .oneOrNone('SELECT * FROM users WHERE user_id = $1', req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

function getUsers(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.manyOrNone(
    'SELECT u.user_id, u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.company_id, c.name FROM users u inner join company c on u.company_id = c.company_id WHERE c.company_id = $1 group by u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.name, c.company_id, u.user_id',

    tokendata.company_id
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(next(err));
    });
}

function registerCompany(req, res) {
  db.tx(async (t) => {
    const {
      body: { name },
      body: { erp_system },
      body: { first_name },
      body: { last_name },
      body: { password },
      body: { email },
      body: { phone_number },
    } = req;
    const company = {
      name: name,
      erp_system: erp_system,
    };
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      user_level: 'Admin',
      phone_number: phone_number,
    };
    const id = await t.one(
      'INSERT INTO company (${this:name}) VALUES (${this:csv}) RETURNING company_id',
      company
    );
    user.password = await bcrypt.hash(password, 10);
    const userWithCompany = { ...user, company_id: id.company_id };
    return t.none(
      'INSERT INTO users (${this:name}) VALUES (${this:csv})',
      userWithCompany
    );
  })
    .then((response) => {
      return res.status(201).json({
        result: 'Bruker og bedrift lagret!',
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
      });
    });
}

async function registerUser(req, res) {
  console.log(req);
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  const {
    body: { first_name },
    body: { last_name },
    body: { password },
    body: { email },
    body: { user_level },
    body: { phone_number }
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
  console.log(user);
  db.query('INSERT INTO users (${this:name}) VALUES (${this:csv})', user)
    .then((response) => {
      return res.status(201).json({
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
}

function getSingleUser(req, res) {
  db.oneOrNone(
    'SELECT u.user_id, u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.company_id, c.name FROM users u inner join company c on u.company_id = c.company_id WHERE u.user_id = $1 group by u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.name, c.company_id, u.user_id',
    req.params.id
  )
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function getCurrentUser(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const tokendata = jwt.verify(token, 'longer-secret-is-better');
  db.oneOrNone(
    'SELECT u.user_id, u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.company_id, c.name FROM users u inner join company c on u.company_id = c.company_id WHERE u.user_id = $1 group by u.first_name, u.last_name, u.email, u.user_level, u.phone_number, c.name, c.company_id, u.user_id',
    tokendata.user_id
  )
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function updateUser(req, res) {
  const condition = pgp.as.format(' WHERE user_id = ${user_id}', req.body);
  const query =
    pgp.helpers.update(
      req.body,
      [
        '?user_id',
        'first_name',
        'last_name',
        'email',
        'user_level',
        'password',
        'phone_number',
      ],
      'users'
    ) + condition;
  db.query(query)
    .then((data) => {
      res.status(200).json({
        msg: 'Bruker oppdatert',
      });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}
async function updateUserPassword(req, res) {
  const password = await bcrypt.hash(req.body.password, 10);
  const user = {
    password: password,
    user_id: req.params.id,
  };
  const condition = pgp.as.format(' where user_id = ${user_id}', user);
  const query = pgp.helpers.update(user, ['password'], 'users') + condition;
  db.query(query)
    .then(
      res.status(200).json({
        status: 'success',
      })
    )
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteUser(req, res) {
  db.result('DELETE FROM users WHERE user_id = $1', req.params.id)
    .then((data) => {
      res.status(200).json({
        status: 'Bruker slettet',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(err);
    });
}

module.exports = {
  signIn,
  registerUser,
  registerCompany,
  getUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getUser,
};
