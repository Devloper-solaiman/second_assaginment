import Joi from 'joi';

const nameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(15)
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .message(
      '{#label} must be capitalized and between 5 to 15 characters long',
    ),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, { name: 'alpha' })
    .message('{#label} must only contain alphabetic characters'),
});

const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const userJoiSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: nameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  hobbies: Joi.array().items(Joi.string().required()).required(),
  address: addressSchema.required(),
  orders: Joi.array().items(orderSchema.required()).required(),
});

export default userJoiSchema;
