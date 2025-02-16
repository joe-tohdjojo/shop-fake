import React, { Suspense } from 'react';

import { ProductsGrid } from '@/components/page/shop/ProductsGrid';
import { QUERY_PARAMS } from '@/lib/constants';
import { Navbar } from '@/components/common/Navbar';
import * as FilterPanel from '@/components/page/shop/FilterPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchProductCategories } from '@/lib/fetchProductCategories';
import { Metadata } from 'next';
import { WithServerData } from '@/components/common/WithServerData';

export async function getFilterParams(
  searchParamsPromise: SearchParams,
): Promise<ProductFilters> {
  const searchParams = await searchParamsPromise;
  return {
    page: Number(searchParams[QUERY_PARAMS.PAGE]) || 1,
    search: searchParams[QUERY_PARAMS.SEARCH] || '',
    sortBy: searchParams[QUERY_PARAMS.SORT_BY] || 'brand',
    sortOrder:
      (searchParams[QUERY_PARAMS.SORT_ORDER] as 'asc' | 'desc') || 'asc',
  };
}

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;

export const metadata: Metadata = {
  title: 'S H P F K - Shop',
  description: "Fake it, 'til you make it",
};

const ShopPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const category = (await params).category;
  const filters = await getFilterParams(searchParams);

  return (
    <div className="grid max-h-screen min-h-screen grid-rows-[65px_auto] overflow-y-scroll bg-background">
      <Navbar />

      <div className="container mx-auto max-h-full px-4 py-8">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[225px_auto]">
          <aside className="relative hidden w-fit space-y-6 md:block">
            <Suspense
              fallback={
                <div className="w-full space-y-6">Loading filter panel...</div>
              }
            >
              <WithServerData fetchFunction={fetchProductCategories}>
                {({ data, error }) => {
                  if (error || !data) return null;
                  return <FilterPanel.Desktop categories={data} />;
                }}
              </WithServerData>
            </Suspense>
          </aside>

          <div className="md:hidden">
            <Suspense fallback={<>Loading...</>}>
              <WithServerData fetchFunction={fetchProductCategories}>
                {({ data, error }) => {
                  if (error || !data) return null;
                  return <FilterPanel.Mobile categories={data} />;
                }}
              </WithServerData>
            </Suspense>
          </div>

          <ScrollArea className="h-full">
            <main className="flex-1">
              <ProductsGrid
                category={category}
                filters={filters}
              />
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
