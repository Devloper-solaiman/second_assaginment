import { Request, Response } from 'express';
import { usersServices } from './user.service';

const createAUsers = async (req: Request, res: Response) => {
  try {
    const { user: users } = req.body;
    const result = await usersServices.createUserFromDB(users);
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
    const { userId } = req.params;
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
  deletdeUsers,
};
