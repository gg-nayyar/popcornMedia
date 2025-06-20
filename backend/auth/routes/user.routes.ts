import userController from '../controller/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);

export default router;