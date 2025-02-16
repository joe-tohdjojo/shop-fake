export const QUERY_PARAMS = {
  CATEGORY: 'c',
  PAGE: 'p',
  SEARCH: 'q',
  SORT_BY: 's',
  SORT_ORDER: 'o',
} as const;

export const SET_FILTER = 'SET_FILTER' as const;

export const FILTER_TYPES = {
  CATEGORY: 'category',
  IN_STOCK: 'inStock',
  PAGE: 'page',
  PRICE_RANGE: 'priceRange',
  SEARCH: 'search',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
} as const;
