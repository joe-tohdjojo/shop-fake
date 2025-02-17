import React, { Suspense } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { ROUTES } from '@/site-config';
import { PageDataWrapper } from '@/components/page/cart/PageDataWrapper';
import { PageDataWrapperSkeleton } from '@/components/page/cart/PageDataWrapperSkeleton';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar page={ROUTES.CART.name} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <Suspense fallback={<PageDataWrapperSkeleton />}>
          <PageDataWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default CartPage;
