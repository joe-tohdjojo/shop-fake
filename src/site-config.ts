export const ROUTES = {
  SEARCH: {
    name: 'Search',
    path: '/search',
  },
  SHOP: {
    name: 'Shop',
    path: '/shop',
    routes: {
      FEATURED: {
        name: 'Featured Products',
        path: '/shop/featured',
      },
    },
  },
  CATEGORY: {
    name: 'Category',
    path: '/categories',
  },
};
