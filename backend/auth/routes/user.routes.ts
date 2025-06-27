import userController from '../controller/user.controller';
import { Router } from 'express';
import { isSuperAdmin } from '../middleware/isSuperAdmin';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.post('/register-admin', isSuperAdmin, userController.registerAdmin);
router.get('/is-admin', userController.isAdmin);

export default router;