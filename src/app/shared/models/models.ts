
export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; }
export interface AuthResponse { token: string; }

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stockQuantity?: number;
}

export interface CartItem {
  orderId?: Order;   // agora é opcional
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id?: number;          // corresponde a Id do C#
  orderId?: number;     // corresponde a OrderId
  productId: number | undefined;    // corresponde a ProductId
  quantity: number;     // corresponde a Quantity
  unitPrice: number;    // corresponde a UnitPrice
  product?: Product; 
}
export interface Order {
  id?: number;          // Id
  customerId: string;   // Required no backend, obrigatório aqui
  totalAmount?: number; // pode vir 0 ou ser calculado
}
