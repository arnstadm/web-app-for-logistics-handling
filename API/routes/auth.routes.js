// routes/auth.routes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authorize = require('../middlewares/auth.js');
const tf = require('@tensorflow/tfjs-node');
const { check, validationResult } = require('express-validator');
const toUint8Array = require('base64-to-uint8array');
const cocossd = require('../objectdetector/cocossd');
const db = require('../db.js');
const usermodules = require('../middlewares/usermodules');
const itemmodules = require('../middlewares/itemmodules');
const imagemodules = require('../middlewares/imagemodules');
const projectmodules = require('../middlewares/projectmodules');

router.route('/validate').get((req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'longer-secret-is-better', function (err, decoded) {
    if (err) {
      return res.status(403).json(err);
    }
    return res.status(200).json(decoded);
  });
});

router
  .route('/imageprocessing')
  .post(authorize, (req, res) => imagemodules.imageprocessing(req, res));

//signin
router.post('/signin', (req, res) => usermodules.signIn(req, res));
//register user
router.post(
  '/register-user',
  [
    check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be atleast 5 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    check('user_level').not().isEmpty(),
    check('phone_number').not().isEmpty().isLength({ max: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('error');
      return res.status(422).jsonp(errors.array());
    } else {
      usermodules.registerUser(req, res);
    }
  }
);

//register company
router.post(
  '/register-company',
  [
    check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty(),
    check('email', 'E-post er påkrevd').not().isEmpty(),
    check('password', 'Passord skal inneholde minst 5 tegn')
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    check('name').not().isEmpty(),
    check('erp_system').not().isEmpty(),
    check('phone_number', 'Skriv korrekt telefonnummer')
      .not()
      .isEmpty()
      .isLength({ max: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      usermodules.registerCompany(req, res);
    }
  }
);

//get users
router.get('/users', (req, res) => usermodules.getUsers(req, res));

//get items
router.get('/items', (req, res) => itemmodules.getItems(req, res));
//router.route('/items').get(authorize, (req, res, next) => usermodules.getItems(res));
//get single user
router.get('/user-profile/', (req, res) => usermodules.getSingleUser(req, res));
//Update user
router.put('/update-user/:id', (req, res) => usermodules.updateUser(req, res));

//Update user password
router.put('/update-user-password/:id', [check('password', 'Passord skal inneholde minst 5 tegn')
  .not()
  .isEmpty()
  .isLength({ min: 5 }),],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('error');
      return res.status(422).json(errors.array());

    } else {
      usermodules.updateUserPassword(req, res)
    }
  }
);

//delete user
router.delete('/delete-user/:id', (req, res) =>
  usermodules.deleteUser(req, res)
);

//Register an item
router.post(
  '/register-item',
  [
    check('name').not().isEmpty(),
    check('item_type_id').not().isEmpty(),
    check('amount').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      itemmodules.registerItem(req, res);
    }
  }
);

//delete item
router.delete('/delete-item/:id', (req, res) =>
  itemmodules.deleteItem(req, res)
);

//Update item
router.put('/update-item/:id', (req, res) => itemmodules.updateItem(req, res));
//Register an item type
router.post(
  '/register-item-type',
  [
    check('item_type_name').not().isEmpty(),
    check('description').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      itemmodules.registerItemType(req, res);
    }
  }
);

//Projects:

router.post(
  '/register-project',
  [
    check('project_number').not().isEmpty(),
    check('project_description').not().isEmpty(),
    check('project_name').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      projectmodules.registerProject(req, res);
    }
  }
);
router.get('/projects', (req, res) => projectmodules.getProjects(req, res));

router.get('/singleproject/:id', (req, res) =>
  projectmodules.getSingleProject(req, res)
);

router.put('/update-project/:id', (req, res) =>
  projectmodules.updateProject(req, res)
);


router.delete('/delete-project/:id', (req, res) =>
  projectmodules.deleteProject(req, res)
);

router.get('/itemtypes', (req, res) => itemmodules.getItemTypes(req, res));

router.get('/itemtypesname', (req, res) =>
  itemmodules.getItemTypesName(req, res)
);
router.get('/singleitem/:id', (req, res) =>
  itemmodules.getSingleItem(req, res)
);

router.get('/singleitemtype/:id', (req, res) =>
  itemmodules.getSingleItemType(req, res)
);

router.put('/update-itemtype/:id', (req, res) =>
  itemmodules.updateItemType(req, res)
);

router.delete('/delete-item-type/:id', (req, res) =>
  itemmodules.deleteItemType(req, res)
);

router.get('/user/:id', (req, res) => usermodules.getUser(req, res));

router.get('/item/:id', (req, res) => itemmodules.getItem(req, res));

router.get('/itemtype/:id', (req, res) => itemmodules.getItemType(req, res));

module.exports = router;
