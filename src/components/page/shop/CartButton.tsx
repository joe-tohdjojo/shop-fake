'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const fetchUserCart = async (userId?: number) => {
  console.log(`@JT ~ fetchUserCart ~ userId:`, userId);
  if (!userId) return {};
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/carts/${userId}`,
  );
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export function CartButton() {
  const { data: userData } = useUser();

  const { data, isFetching, error } = useQuery({
    queryKey: ['userCart', userData?.id],
    queryFn: () => fetchUserCart(userData?.id),
  });

  console.log(`@JT ~ CartButton ~ isFetching:`, isFetching);
  console.log(`@JT ~ CartButton ~ data:`, data, error);

  if (!data) return null;

  return (
    <Button
      asChild
      className="relative h-9 w-9"
      variant="ghost"
    >
      <Link href="/cart">
        {data.products && !isFetching && (
          <div className="absolute right-[-20%] top-[-20%] flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-1">
            {data.products.length}
          </div>
        )}
        <ShoppingCart></ShoppingCart>
      </Link>
    </Button>
  );
}
