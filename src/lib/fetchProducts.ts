interface Options {
  filter?: {
    category?: string;
    order?: 'asc' | 'desc';
    page?: number;
    search?: string;
    sortBy?: string;
  };
  select?: {
    title?: boolean;
    description?: boolean;
    category?: boolean;
    price?: boolean;
    discountPercentage?: boolean;
    rating?: boolean;
    stock?: boolean;
    tags?: boolean;
    thumbnail?: boolean;
    brand?: boolean;
    sku?: boolean;
    weight?: boolean;
    dimensions?: boolean;
    warrantyInformation?: boolean;
    shippingInformation?: boolean;
    availabilityStatus?: boolean;
    reviews?: boolean;
  };
}

const fetchOptions: RequestInit = {
  next: { revalidate: 3600 /* Every hour */ },
  cache: 'force-cache',
};

export const fetchProducts = async ({
  filter = {},
  select,
}: Options): Promise<{
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}> => {
  // INFO: Uncomment to mock 10 second delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const {
    category,
    order = 'asc',
    page = 1,
    search = '',
    sortBy = 'title',
  } = filter;
  const limit = 24;
  const selectValue = select
    ? Object.keys(select).reduce(
        (acc, key, i) => `${acc}${i === 0 ? '' : ','}${key}`,
        '',
      )
    : '';
  let filters = `limit=${24}&skip=${(page - 1) * limit}&sortBy=${sortBy}&order=${order}`;
  let slug = '';
  if (search) {
    slug = '/search';
    filters = filters + `&q=${search}`;
  } else if (category && category !== 'all') {
    slug = `/category/${category}`;
  }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products${slug}?${filters}${`&select=${selectValue}`}`;

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error('Unable to fetch products.');
  }

  return await response.json();
};
