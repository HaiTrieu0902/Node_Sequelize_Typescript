import { StaffController } from '../controller';
import StaffValidation from '../middleware/validation/Staff.validation';
const express = require('express');
const router = express.Router();

router.post('/register', StaffValidation?.RegisterValidation, StaffController.Register);
router.post('/login', StaffController.Login);

export default router;
