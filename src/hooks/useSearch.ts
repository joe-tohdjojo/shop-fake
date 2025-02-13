import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const searchSchema = z.object({
  search: z.string().min(1),
});
export type SearchSchema = z.infer<typeof searchSchema>;

const searchProducts = async (search: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/search?q=${search}`,
  );

  if (!response.ok) throw new Error('Unable to search product');
  const data = await response.json();
  return data;
};

interface Options {
  onError: (err: Error) => void;
  onSuccess: (data: unknown) => void;
}

export const useSearch = ({
  onError = () => {},
  onSuccess = () => {},
}: Options) => {
  return useMutation({
    mutationFn: async (variables: { search: string }) =>
      await searchProducts(variables.search),
    onSuccess,
    onError,
  });
};
