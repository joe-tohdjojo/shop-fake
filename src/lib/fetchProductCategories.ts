export const fetchProductCategories = async (): Promise<{
  data: Category[] | null;
  error: Error | null;
}> => {
  // INFO: Uncomment to mock 10 second delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`,
    { cache: 'force-cache', next: { revalidate: 3600 /* Every hour */ } },
  );

  if (!response.ok)
    return {
      data: null,
      error: new Error('Unable to fetch product categories.'),
    };

  const data = await response.json();

  return { data, error: null };
};
