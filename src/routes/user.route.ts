import { UserController } from '../controller';
const express = require('express');
const router = express.Router();

router.get('/getAllUser', UserController.GetAllUser);

export default router;
