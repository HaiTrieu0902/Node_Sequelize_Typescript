import { UserController } from '../controller';
const express = require('express');
const router = express.Router();

router.get('/getAllUser', UserController.GetAllUser);
router.get('/getUser/:id', UserController.GetDetailUser);
router.post('/createUser', UserController.CreateUser);
router.put('/updateUser/:id', UserController.UpdateUser);
router.delete('/deleteUser/:id', UserController.DeleteUser);
export default router;
