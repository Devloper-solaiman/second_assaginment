import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();
router.post('/create-user', UsersControllers.createAUsers);
router.post('/:userId/order', UsersControllers.createUserOrders);
router.get('/:userId/order', UsersControllers.getAllOrdersByUserId);
router.get('/', UsersControllers.getAllUsers);
router.get('/:userId/order/total-price', UsersControllers.getUserTotalPrice);
router.get('/:userId', UsersControllers.getSingleUser);
router.put('/:userId', UsersControllers.updatedUsers);
router.delete('/:userId', UsersControllers.deletdeUsers);

export const UsersRouters = router;
