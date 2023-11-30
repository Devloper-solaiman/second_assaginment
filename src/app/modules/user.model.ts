import { Schema, model } from 'mongoose';
import { Name, user, userAddress, userOrders } from './user/user.interface';

const fullNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, '{VALUE} is not valid minimum 5 characters longar '],
    maxlength: [15, '{VALUE} is not valid maximum 15 characters longar'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message:
        '{VALUE} is not valid, First Letter uppercase an all leater Lower case',
    },
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userOrdersSchema = new Schema<userOrders>([
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
]);
const userAddressSchema = new Schema<userAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<user>({
  userId: { type: Number, required: true, unique: true },
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
    unique: true,
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

export const userModel = model<user>('user', userSchema);
