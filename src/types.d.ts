type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Product = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
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

type Address = {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  country: string;
  postalCode: string;
  state: string;
  stateCode: string;
};

type User = {
  address: Address;
  age: number;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    iban: string;
  };
  birthDate: string;
  bloodGroup: string;
  company: {
    address: Address;
    department: string;
    name: string;
    title: string;
  };
  crypto: {
    coin: string;
    network: string;
    wallet: string;
  };
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: { color: string; type: string };
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
};

type Cart = {
  discountedTotal: number;
  id: number;
  products: Product[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
};
