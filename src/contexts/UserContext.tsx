'use client';

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const UserContext = createContext<{
  data?: User;
  isFetching: boolean;
  error: Error | null;
}>({ isFetching: false, error: null });

const fetchCurrentUser = async () => {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include', // Include cookies (e.g., accessToken) in the request
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    retry: 1,
  });

  return (
    <UserContext.Provider value={{ data, isFetching, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
