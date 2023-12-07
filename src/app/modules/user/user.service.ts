import { userModel } from './user.model';
import { user, userOrders } from './user.interface';

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
const createOrdersfromDB = async (userId: string, order: userOrders) => {
  const result = await userModel.updateOne(
    { userId },
    { $push: { orders: order } },
    { runValidators: true },
  );
  return result;
};
const getOdersByIdfromDB = async (userId: string) => {
  const result = await userModel.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);
  return result;
};
const getTotalPricefromDB = async (userId: string) => {
  const result = await userModel.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { totalPrice: 1, _id: 0 } },
  ]);
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
  createOrdersfromDB,
  getOdersByIdfromDB,
  getTotalPricefromDB,
  deleteUsersfromDB,
};
