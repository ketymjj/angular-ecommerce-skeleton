export const environment = {
  production: true,
  apiGatewayUrl: 'https://api.seudominio.com',
  services: {
    auth: '/auth',
    products: '/products',
    orders: '/orders'
  },
  storageKeys: {
    token: 'auth_token',
    cart: 'cart_items'
  }
};
