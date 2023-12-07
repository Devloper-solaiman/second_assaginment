import { Schema, model } from 'mongoose';
import { Name, user, UserAddress, userOrders } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<Name>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { _id: false },
);

const userAddressSchema = new Schema<UserAddress>(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { _id: false },
);
const userOrdersSchema = new Schema<userOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const userSchema = new Schema<user>({
  userId: { type: Number },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  hobbies: [
    {
      type: String,
      required: true,
    },
  ],
  address: {
    type: userAddressSchema,
    required: true,
  },

  orders: [
    {
      type: userOrdersSchema,
    },
  ],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: false });
  next();
});

export const userModel = model<user>('user', userSchema);
