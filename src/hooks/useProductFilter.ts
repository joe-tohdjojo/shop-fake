import { useReducer } from 'react';

export const SET_FILTER = 'SET_FILTER' as const;

type State = {
  category: string;
  page: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export const initialState: State = {
  category: 'all',
  page: 1,
  search: '',
  sortBy: 'brand',
  sortOrder: 'asc',
} as const;

const reducer = (
  state: State,
  action: { type: 'SET_FILTER'; payload: { key: string; value: unknown } },
) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export const useProductFilter = (
  // filters: ProductFilters & { category: string | string[] | undefined },
  filters: State,
) => {
  return useReducer(reducer, filters);
};
