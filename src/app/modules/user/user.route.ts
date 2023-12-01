import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();
router.post('/create-user', UsersControllers.createAUsers);
router.get('/', UsersControllers.getAllUsers);
router.get('/:userId', UsersControllers.getSingleUser);
router.patch('/:userId', UsersControllers.updatedUsers);
router.delete('/:userId', UsersControllers.deletdeUsers);

export const UsersRouters = router;
