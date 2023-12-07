export type Name = {
  firstName: string;
  lastName: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};
export type userOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type user = {
  userId: number;
  username: string;
  password: string;
  fullName: Name;
  age: number;
  email: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
  hobbies: string[];
  address: UserAddress;
  orders?: userOrders;
};
