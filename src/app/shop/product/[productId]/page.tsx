import { Navbar } from '@/components/common/Navbar';
import { ROUTES } from '@/site-config';
import { PageDataWrapper } from '@/components/page/product/PageDataWrapper';
import { Suspense } from 'react';
import { PageDataWrapperSkeleton } from '@/components/page/product/PageDataWrapperSkeleton';

type Params = Promise<{ productId: string }>;

export default async function Product({ params }: { params: Params }) {
  const { productId } = await params;
  return (
    <div className="min-h-screen bg-background">
      <Navbar page={ROUTES.PRODUCT.name} />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<PageDataWrapperSkeleton />}>
          <PageDataWrapper productId={productId} />
        </Suspense>
      </div>
    </div>
  );
}
