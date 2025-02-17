'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

export function CartButton() {
  const { data, isFetching } = useCart();

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
