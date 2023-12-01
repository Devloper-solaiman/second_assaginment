import { userModel } from './user.model';
import { user } from './user.interface';

const createUserFromDB = async (userdata: user) => {
  const result = await userModel.create(userdata);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await userModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await userModel.findOne({ userId });
  return result;
};
const updateUsersfromDB = async (userId: string) => {
  const result = await userModel.updateOne({ userId });
  return result;
};
const deleteUsersfromDB = async (userId: string) => {
  const result = await userModel.deleteOne({ userId }, { isDelited: true });
  return result;
};

export const usersServices = {
  createUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUsersfromDB,
  deleteUsersfromDB,
};
