import { Router } from 'express';
import {login} from "../controller/authController";
const { validate } = require('../validator/authValidator');

const router = Router();
router.post('/', validate('login'), login);

export default router;
