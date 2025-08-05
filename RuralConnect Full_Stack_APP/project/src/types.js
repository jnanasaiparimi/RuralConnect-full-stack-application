// Type definitions for TypeScript reference
// In JavaScript, these are just for documentation

export const UserType = {
  id: 'string',
  name: 'string',
  email: 'string',
  phone: 'string',
  address: 'string'
};

export const ProductType = {
  id: 'string',
  name: 'string',
  price: 'number',
  image: 'string',
  category: 'string',
  description: 'string',
  uses: 'array',
  benefits: 'array',
  ingredients: 'string',
  storage: 'string',
  weight: 'string',
  brand: 'string',
  rating: 'number',
  reviews: 'number'
};

export const ServiceType = {
  id: 'string',
  name: 'string',
  icon: 'string',
  description: 'string'
};

export const NewsItemType = {
  id: 'string',
  title: 'string',
  date: 'string',
  summary: 'string'
};

export const CartItemType = {
  product: 'ProductType',
  quantity: 'number'
};

export const ContactSubmissionType = {
  id: 'string',
  name: 'string',
  email: 'string',
  message: 'string',
  date: 'string'
};