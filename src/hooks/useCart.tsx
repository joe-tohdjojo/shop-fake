'use client';

import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/contexts/UserContext';

const fetchUserCart = async (userId?: number) => {
  if (!userId) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/carts/user/${userId}`,
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.carts[0] || null;
};

export const useCart = () => {
  const { data: userData } = useUser();

  return useQuery({
    queryKey: ['cart'],
    queryFn: () => fetchUserCart(userData?.id),
  });
};
