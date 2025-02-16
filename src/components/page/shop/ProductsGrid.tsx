import Image from 'next/image';

import { fetchProducts } from '@/lib/fetchProducts';
import { FILTER_TYPES } from '@/lib/constants';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Rating } from '@/components/common/Rating';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';

export async function ProductsGrid({
  category,
  filters,
}: {
  category: string;
  filters: ProductFilters;
}) {
  // TODO: Handle error
  const data = await fetchProducts({
    filter: {
      category: category,
      order: filters[FILTER_TYPES.SORT_ORDER] as 'asc' | 'desc',
      page: filters[FILTER_TYPES.PAGE] ? Number(filters[FILTER_TYPES.PAGE]) : 1,
      search: filters[FILTER_TYPES.SEARCH] || '',
      sortBy: filters[FILTER_TYPES.SORT_BY] as string,
    },
    select: {
      brand: true,
      category: true,
      description: true,
      price: true,
      rating: true,
      stock: true,
      thumbnail: true,
      title: true,
    },
  });

  if (!data) {
    return (
      <div className="mb-8">
        We were unable to retrieve product data. Please refresh the page.
      </div>
    );
  }

  return (
    <>
      {filters.search && (
        <div className="mb-8">
          Showing search results for{' '}
          <span className="font-bold">{filters.search}</span>:
        </div>
      )}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.products?.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col"
          >
            <CardHeader className="relative p-2">
              <Image
                alt={product.title}
                className="h-48 w-full rounded-t-lg object-cover"
                height={300}
                src={product.thumbnail}
                unoptimized
                width={300}
              />
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">
                  {product.brand}
                </span>
              </div>
              <CardTitle className="mb-2">{product.title}</CardTitle>
              <p className="mb-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <Rating score={product.rating} />
              <div className="mt-4">
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">
                  {product.category[0].toUpperCase() +
                    product.category.slice(1)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex w-full flex-row justify-center">
        <Pagination
          category={category}
          filters={filters}
          totalProducts={data.total}
        />
      </div>
    </>
  );
}
