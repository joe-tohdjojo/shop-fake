import {
  Pagination as P,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { QUERY_PARAMS } from '@/lib/constants';
import { ROUTES } from '@/site-config';

const generateQueryString = (filters: ProductFilters) => {
  return `?${QUERY_PARAMS.PAGE}=${filters.page}&${QUERY_PARAMS.SORT_BY}=${filters.sortBy}&${QUERY_PARAMS.SORT_ORDER}=${filters.sortOrder}`;
};

export function Pagination({
  category,
  filters,
  totalProducts,
}: {
  category: string;
  filters: ProductFilters;
  totalProducts?: number;
}) {
  const totalPages = totalProducts ? Math.ceil(totalProducts / 24) : 500;

  return (
    <P className="mx-0">
      <PaginationContent className="flex w-[300px] items-center justify-center">
        <PaginationItem className={filters.page > 1 ? 'flex' : 'invisible'}>
          <PaginationPrevious
            href={`${ROUTES.SHOP.path}/category/${category}${generateQueryString({ ...filters, page: filters.page - 1 })}`}
          />
        </PaginationItem>
        <PaginationItem className={filters.page > 1 ? 'flex' : 'invisible'}>
          <PaginationLink
            href={`${ROUTES.SHOP.path}/category/${category}${generateQueryString(filters)}`}
          >
            {filters.page - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
          >
            {filters.page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={filters.page < totalPages ? 'flex' : 'invisible'}
        >
          <PaginationLink
            href={`${ROUTES.SHOP.path}/category/${category}${generateQueryString({ ...filters, page: filters.page + 1 })}`}
          >
            {filters.page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={filters.page < totalPages ? 'flex' : 'invisible'}
        >
          <PaginationNext
            href={`${ROUTES.SHOP.path}/category/${category}${generateQueryString({ ...filters, page: filters.page + 1 })}`}
          />
        </PaginationItem>
      </PaginationContent>
    </P>
  );
}
