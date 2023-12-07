import { Request, Response } from 'express';
import { usersServices } from './user.service';
import userJoiValidationSchema, {
  orderValidationSchema,
} from './userJOiValidator';

const createAUsers = async (req: Request, res: Response) => {
  try {
    const { user: users } = req.body;
    const { error } = userJoiValidationSchema.validate(users);
    const result = await usersServices.createUserFromDB(users);

    if (error) {
      res.status(204).json({
        success: false,
        message: 'users failed to create',
        data: error,
      });
    }
    res.status(200).json({
      success: true,
      message: 'users created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'users failed to create',
      data: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All users data successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Data vul hoiche',
      data: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await usersServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'single user resived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'single user atkaiche',
      data: error,
    });
  }
};

const updatedUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await usersServices.updateUsersfromDB(userId);
    res.status(200).json({
      success: true,
      message: 'users updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'users update hoy nai',
      data: error,
    });
  }
};
const createUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { user: users } = req.body;
    const { error } = orderValidationSchema.validate(users);
    const result = await usersServices.createOrdersfromDB(userId, users);
    if (error) {
      res.status(204).json({
        success: false,
        message: 'created failed order',
        data: error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'create orders successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'orders not created successfully',
      data: error,
    });
  }
};

const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderUser = await usersServices.getSingleUserFromDB(userId);
    if (!orderUser) {
      return res.status(404).json({
        success: false,
        message: 'user is not found',
      });
    }
    const result = await usersServices.getOdersByIdfromDB(userId);
    res.status(200).json({
      success: true,
      message: 'user All Orders successfully geted',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'user Order not found',
      data: err,
    });
  }
};

const getUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await usersServices.getTotalPricefromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price geted',
      data: {
        totalPrice: result[0]?.totalPrice || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'total price not worked',
      data: error,
    });
  }
};

const deletdeUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await usersServices.deleteUsersfromDB(userId);
    res.status(200).json({
      success: true,
      message: 'users deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'users deleted hoy nai',
      data: error,
    });
  }
};

export const UsersControllers = {
  createAUsers,
  getAllUsers,
  getSingleUser,
  updatedUsers,
  createUserOrders,
  getAllOrdersByUserId,
  getUserTotalPrice,
  deletdeUsers,
};
