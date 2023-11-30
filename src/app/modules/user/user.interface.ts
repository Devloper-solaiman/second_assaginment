export type Name = {
  firstName: string;
  lastName: string;
};

export type userOrders = [
  {
    productName: string;
    price: number;
    quantity: number;
  },
];

export type userAddress = {
  street: string;
  city: string;
  country: string;
};
export type userHobbies = string[];

export type user = {
  userId: number;
  username: string;
  password: string;
  fullName: Name;
  age: number;
  email: string;
  isActive: 'active' | 'blocked';
  hobbies: userHobbies;
  address: userAddress;
  orders: userOrders;
};
