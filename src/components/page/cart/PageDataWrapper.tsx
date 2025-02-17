import { WithCartState } from './WithCartState';

const fetchCartItems = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return [
    {
      id: 1,
      image: `/image/100x100`,
      maxQuantity: 5,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      quantity: 1,
    },
    {
      id: 2,
      image: `/image/100x100`,
      maxQuantity: 10,
      name: 'Organic Cotton T-Shirt',
      price: 34.99,
      quantity: 2,
    },
  ];
};

export async function PageDataWrapper() {
  const cartItems = await fetchCartItems();

  return <WithCartState initialCartItems={cartItems} />;
}
