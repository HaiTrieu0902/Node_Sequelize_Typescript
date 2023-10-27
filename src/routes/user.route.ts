import { UserController } from '../controller';
import auth from '../middleware/auth';
const express = require('express');
const router = express.Router();

router.get('/getAllUser', auth.Authenticated, UserController.GetAllUser);
router.get('/getUser/:id', UserController.GetDetailUser);
router.post('/createUser', auth.Authenticated, auth.SuperAdmin, UserController.CreateUser);
router.put('/updateUser/:id', UserController.UpdateUser);
router.delete('/deleteUser/:id', UserController.DeleteUser);
export default router;
