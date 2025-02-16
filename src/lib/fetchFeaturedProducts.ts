interface Result {
  data: (Product & { badge: string })[] | null;
  error: Error | null;
}

const fetchOptions: RequestInit = {
  next: { revalidate: 3600 },
  cache: 'force-cache',
};

export const fetchFeaturedProducts = async (): Promise<Result> => {
  // INFO: Uncomment to mock 4 second delay
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const responses = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/1?select=title,category,price,rating,thumbnail`,
      fetchOptions,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/20?select=title,category,price,rating,thumbnail`,
      fetchOptions,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/36?select=title,category,price,rating,thumbnail`,
      fetchOptions,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/49?select=title,category,price,rating,thumbnail`,
      fetchOptions,
    ),
  ]);

  const result: Result = {
    data: null,
    error: null,
  };

  responses.some((response) => {
    if (!response.ok) {
      result.data = null;
      result.error = new Error('Unable to fetch featured products.');
    }
  });

  if (result.error) return result;

  const data = await Promise.all(responses.map((response) => response.json()));
  result.data = data;

  // Attach additional information
  const badge = ['New Arrival', 'Eco-Friendly', 'Best Seller', 'Top Rated'];
  data.forEach((product, i) => {
    data[i] = { ...product, badge: badge[i] };
  });

  return result;
};
