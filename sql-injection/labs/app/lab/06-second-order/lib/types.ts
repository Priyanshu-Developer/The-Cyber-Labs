export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface ShopUser {
  id: number;
  username: string;
  email: string;
  role: string;
}
