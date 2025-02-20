import Image from 'next/image';
import Link from 'next/link';

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
import { ROUTES } from '@/site-config';
import { AddToCartButton } from '@/components/page/shop/AddToCartButton';

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
        <div className="mb-8 flex flex-col gap-2">
          <p>
            Showing search results for{' '}
            <span className="font-bold">{filters.search}</span>:
          </p>
          <Button
            asChild
            className="w-fit"
            size="sm"
            variant="outline"
          >
            <Link href={`${ROUTES.SHOP.path}/category/all`}>Clear search</Link>
          </Button>
        </div>
      )}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.products?.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col"
          >
            <CardHeader className="relative p-2">
              <Link href={`/shop/product/${product.id}`}>
                <Image
                  alt={product.title}
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={300}
                  src={product.thumbnail}
                  unoptimized
                  width={300}
                />
              </Link>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <CardTitle className="mb-2">
                <Link href={`/shop/product/${product.id}`}>
                  {product.title}
                </Link>
              </CardTitle>
              <div className="mb-2">
                <Link href={`/shop/product/${product.id}`}>
                  <span className="text-sm text-muted-foreground">
                    {product.brand}
                  </span>
                </Link>
              </div>
              <Link href={`/shop/product/${product.id}`}>
                <p className="mb-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </Link>
              <Rating score={product.rating} />
              <div className="mt-4">
                <Link href={`/shop/product/${product.id}`}>
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </Link>
              </div>
              <div className="mt-2">
                <Link href={`/shop/product/${product.id}`}>
                  <span className="text-sm text-muted-foreground">
                    {product.category[0].toUpperCase() +
                      product.category.slice(1)}
                  </span>
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <AddToCartButton
                productId={product.id}
                productTitle={product.title}
                stock={product.stock}
              />
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
