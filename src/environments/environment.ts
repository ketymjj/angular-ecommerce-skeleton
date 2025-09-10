export const environment = {
  production: false,

  // API Gateway (caso use futuramente, senão pode deixar vazio)
  apiGatewayUrl: '',

  // Endpoints dos serviços
  services: {
    auth: 'http://localhost:5202/api/auth',
    products: 'http://localhost:5202/api/product',
    orders: 'http://localhost:5202/api/orders',
    orderItems: 'http://localhost:5202/api/orderItems'
  },

   apiUrl: 'http://localhost:5202/images/',

  

  // Chaves de storage local
  storageKeys: {
    token: 'auth_token',
    cart: 'cart_items'
  }
};
