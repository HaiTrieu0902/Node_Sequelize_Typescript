import { StaffController } from '../controller';
const express = require('express');
const router = express.Router();

router.post('/register', StaffController.Register);
export default router;
