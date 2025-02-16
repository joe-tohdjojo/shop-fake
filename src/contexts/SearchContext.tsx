import { createContext } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { QUERY_PARAMS } from '@/lib/constants';
import { ROUTES } from '@/site-config';

export const searchSchema = z.object({
  search: z.string().min(1),
});
export type SearchSchema = z.infer<typeof searchSchema>;

const SearchContext = createContext({});

export function SearchContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });
  const handleSubmit = (values: SearchSchema) => {
    router.push(
      `${ROUTES.SHOP.path}/category/all?${QUERY_PARAMS.SEARCH}=${values.search}`,
    );
  };
  return (
    <SearchContext.Provider
      value={{
        handleSubmit,
        form,
        search: '',
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
