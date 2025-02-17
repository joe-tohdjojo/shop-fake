'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/site-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const addCart = async ({
  products,
  userId,
}: {
  products: { id: number; quantity: number }[];
  userId?: number;
}) => {
  if (!userId) return {};

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/carts/add`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        products,
      }),
    },
  );

  if (!response.ok) throw new Error(response.statusText);

  const addCartData = await response.json();
  return addCartData;
};

export function AddToCartButton({
  productId,
  stock,
}: {
  productId: number;
  stock: number;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { data: cart } = useCart();
  const { mutate } = useMutation({
    mutationKey: ['addToCart', productId],
    mutationFn: () => {
      if (!cart) {
        return addCart({
          products: [{ id: productId, quantity: 1 }],
          userId: user?.id,
        });
      }
      let productAdded = false;
      const products = cart.products.map(
        (product: Product & { quantity: number }) => {
          if (product.id === productId) productAdded = true;
          return {
            id: product.id,
            quantity: productAdded ? product.quantity + 1 : product.quantity,
          };
        },
      );

      if (!productAdded) products.push({ id: productId, quantity: 1 });

      return addCart({
        userId: user?.id,
        products,
      });
    },
    onSuccess: (data) => {
      if (!user || !data) return;
      queryClient.setQueryData(['cart'], (oldData: Cart) => {
        const newData = { ...data };
        newData.products = [
          ...((oldData || {}).products || []),
          data.products[data.products.length - 1],
        ];
        return newData;
      });
    },
  });

  const handleClick = () => {
    if (!user)
      return router.push(`${ROUTES.LOGIN.path}?redirect=${window.location}`);
    mutate();
  };

  return (
    <Button
      className="w-full"
      disabled={stock === 0}
      onClick={handleClick}
    >
      {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  );
}
