export type Screen =
  | 'login'
  | 'home'
  | 'scanner'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'success'
  | 'exit'
  | 'shoppingList'
  | 'history';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  unit: string;
  barcode: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  offer?: string;
  tag?: 'bestseller' | 'new' | 'deal';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  total: number;
  subtotal: number;
  discount: number;
  tax: number;
  paymentMethod: string;
  itemCount: number;
  createdAt: number;
  qrToken: string;
}

export type PaymentMethod = 'upi' | 'card' | 'wallet';


export interface ScanHistoryItem {
  product: Product;
  scannedAt: string;
}
