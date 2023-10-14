import UserController from '../controller/UserController';
const express = require('express');
const routerInit = express.Router();
routerInit.get('/getAllUser', UserController.GetAllUser);
export default routerInit;
