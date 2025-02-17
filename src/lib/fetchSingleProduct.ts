interface Options {
  productId: string;
}

const fetchOptions: RequestInit = {
  next: { revalidate: 3600 /* Every hour */ },
  cache: 'force-cache',
};

export const fetchSingleProduct = async ({
  productId,
}: Options): Promise<Product> => {
  // INFO: Uncomment to mock 10 second delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`;

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error('Unable to fetch products.');
  }

  return await response.json();
};
