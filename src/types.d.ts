type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  thumbnail: string;
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
};

type Category = {
  slug: 'string';
  name: 'string';
  url: 'string';
};

type ProductFilters = {
  page: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};
