'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ReadonlyURLSearchParams,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { FILTER_TYPES, QUERY_PARAMS } from '@/lib/constants';
import { ROUTES } from '@/site-config';
import { initialProductFilterState as initialState } from '@/hooks';

const SORT_BY = ['title', 'brand', 'category', 'price', 'rating'];

const getFilterParams = (
  searchParams: ReadonlyURLSearchParams,
): ProductFilters => {
  return {
    page: Number(searchParams.get(QUERY_PARAMS.PAGE)) || initialState.page,
    search: searchParams.get(QUERY_PARAMS.SEARCH) || initialState.search,
    sortBy: searchParams.get(QUERY_PARAMS.SORT_BY) || initialState.sortBy,
    sortOrder:
      (searchParams.get(QUERY_PARAMS.SORT_ORDER) as 'asc' | 'desc') ||
      initialState.sortOrder,
  };
};

export function Desktop({ categories }: { categories?: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { category } = useParams();
  const filters = getFilterParams(searchParams);
  const [state, setState] = useState({
    category,
    ...filters,
  });

  const handleFilterChange = useCallback((key: string, value: unknown) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  useEffect(
    () => handleFilterChange(FILTER_TYPES.CATEGORY, state.category),
    [state.category, handleFilterChange],
  );

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set(QUERY_PARAMS.PAGE, '1');
    params.set(QUERY_PARAMS.SORT_BY, state.sortBy);
    params.set(QUERY_PARAMS.SORT_ORDER, state.sortOrder);
    if (state.search) params.set(QUERY_PARAMS.SEARCH, state.search);

    router.push(
      `${ROUTES.SHOP.path}/category/${state.category}?${params.toString()}`,
    );
  }, [router, searchParams, state]);

  return (
    <div className="sticky top-[calc(65px+2rem)] space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <ScrollArea className="h-72">
          <div className="space-y-2">
            <Button
              variant={state.category === 'all' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleFilterChange(FILTER_TYPES.CATEGORY, 'all')}
            >
              All Categories
            </Button>
            {categories?.map((c) => (
              <Button
                key={c.slug}
                variant={state.category === c.slug ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() =>
                  handleFilterChange(FILTER_TYPES.CATEGORY, c.slug)
                }
              >
                {c.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Sort By</h3>
        <Select
          value={state.sortBy}
          onValueChange={(value) =>
            handleFilterChange(FILTER_TYPES.SORT_BY, value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_BY.map((field) => (
              <SelectItem
                key={field}
                value={field}
              >
                {field[0].toUpperCase() + field.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-2">
          <Select
            value={state.sortOrder}
            onValueChange={(value) =>
              handleFilterChange(FILTER_TYPES.SORT_ORDER, value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Order..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
}

export function Mobile({ categories }: { categories?: Category[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 w-full"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters & Sort
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Filters & Sort</SheetTitle>
      <SheetContent
        side="left"
        className="w-fit overflow-scroll overflow-x-hidden sm:w-fit"
      >
        <Desktop categories={categories} />
      </SheetContent>
    </Sheet>
  );
}
