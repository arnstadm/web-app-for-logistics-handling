import express from 'express';
const router = express.Router();
import authorize from '../Components/Authorization/auth';
import { signIn, validate } from '../Components/Authorization/validation';
import { createUser, getMe } from '../Components/Users/userModules';
import { createItem } from '../Components/Items/itemModules';
import { createItemType } from '../Components/ItemTypes/itemTypeModules';
import { createTransaction } from '../Components/Transactions/transactions';
import { imageDetections } from '../Components/Images/detections';
import { createProject } from '../Components/Projects/projects';
import { getClasses } from '../Components/Images/classesModules';
import { registerCompany } from '../Components/Company/company';
import { check } from 'express-validator';
import {
  getAll,
  getById,
  update,
  deleteFromDb,
} from '../Components/Functions/genericFunctions';

//authorization routes
router.post('/signin', signIn);
router.route('/validate').get(authorize, validate);

//company routes
router.route('/signup').post([
  check('password')
    .isLength({ min: 5 })
    .withMessage('Passord må være minimum 5 tegn'),
  check('name').not().isEmpty().withMessage('Må inneholde bedriftsnavn'),
  check('first_name').not().isEmpty().withMessage('Må inneholde et fornavn'),
  check('last_name').not().isEmpty().withMessage('Må inneholde et etternavn'),
  check('user_level').not().isEmpty().withMessage('Brukernivå ikke valgt'),
  check('phone_number')
    .not()
    .isEmpty()
    .isLength({ max: 8, min: 8 })
    .withMessage('Feil i telefonnummer'),
],
  registerCompany);

//user routes
router.route('/users').get(authorize, getAll('users'));
router.route('/users/:id').get(authorize, getById('users', 'user_id'));
router.route('/me').get(authorize, getMe);
router.route('/users').post(
  authorize,
  [
    check('password')
      .isLength({ min: 5 })
      .withMessage('Passord må være minimum 5 tegn'),
    check('first_name').not().isEmpty().withMessage('Må inneholde et fornavn'),
    check('last_name').not().isEmpty().withMessage('Må inneholde et etternavn'),
    check('user_level').not().isEmpty().withMessage('Brukernivå ikke valgt'),
    check('phone_number')
      .not()
      .isEmpty()
      .isLength({ max: 8 })
      .withMessage('Feil i telefonnummer'),
  ],
  createUser
);
router.route('/users/:id').put(authorize, update('users', 'user_id'));
router.route('/users/:id').delete(authorize, deleteFromDb('users', 'user_id'));

//item routes
router.route('/items').get(authorize, getAll('items'));
router.route('/items/:id').get(authorize, getById('items', 'item_id'));
router.route('/items').post(
  authorize,
  [
    check('name').not().isEmpty().withMessage('Må inneholde et navn'),
    check('amount').not().isEmpty().withMessage('Må inneholde antall'),
  ],
  createItem);
router.route('/items/:id').put(authorize, update('items', 'item_id'));
router.route('/items/:id').delete(authorize, deleteFromDb('items', 'item_id'));

//item type routes
router.route('/itemtypes').get(authorize, getAll('item_types'));
router
  .route('/itemtypes/:id')
  .get(authorize, getById('item_types', 'item_type_id'));
router.route('/itemtypes').post(
  authorize,
  [
    check('item_type_name').not().isEmpty().withMessage('Må inneholde et navn'),
  ],
  createItemType);
router
  .route('/itemtypes/:id')
  .put(authorize, update('item_types', 'item_type_id'));
router
  .route('/itemtypes/:id')
  .delete(authorize, deleteFromDb('item_types', 'item_type_id'));

//transaction routes
router.route('/transactions').get(authorize, getAll('transactions'));
router
  .route('/transactions/:id')
  .get(authorize, getById('transactions', 'transaction_id'));
router.route('/transactions').post(authorize, createTransaction);
router
  .route('/transactions/:id')
  .put(authorize, update('transactions', 'transaction_id'));
router
  .route('/transactions/:id')
  .delete(authorize, deleteFromDb('transactions', 'transaction_id'));

//image routes
router.route('/images').post(authorize, imageDetections);

//project routes
router.route('/projects').get(authorize, getAll('projects'));
router.route('/projects/:id').get(authorize, getById('projects', 'project_id'));
router.route('/projects/').post(
  authorize,
  [
    check('project_name').not().isEmpty().withMessage('Må inneholde et navn'),
    check('project_number').not().isEmpty().withMessage('Må inneholde nummer'),
  ],
  createProject);
router.route('/projects/:id').put(authorize, update('projects', 'project_id'));
router
  .route('/projects/:id')
  .delete(authorize, deleteFromDb('projects', 'project_id'));

//object detection classes routes
router.route('/classes').get(authorize, getClasses);

export default router;
