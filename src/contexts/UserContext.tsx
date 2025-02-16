'use client';

import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const UserContext = createContext<{
  data?: User;
  error: Error | null;
  isFetching: boolean;
  logout?: () => void;
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

const logoutUser = async () => {
  const response = await fetch('/api/auth/logout', {
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
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    retry: (failureCount, error) => {
      if (error.message === 'Unauthorized') return false;
      if (failureCount < 3) return true;
      return false;
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    retry: () => false,
  });

  return (
    <UserContext.Provider value={{ data, isFetching, error, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
