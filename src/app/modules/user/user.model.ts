import { Schema, model } from 'mongoose';
import { Name, user, userAddress, userOrders } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const fullNameSchema = new Schema<Name>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const userOrdersSchema = new Schema<userOrders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
]);
const userAddressSchema = new Schema<userAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
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
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
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
      required: true,
    },
  ],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
  next()
})
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const userModel = model<user>('user', userSchema);
