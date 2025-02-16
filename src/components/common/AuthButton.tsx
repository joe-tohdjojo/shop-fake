'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const fetchCurrentUser = async () => {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include', // Include cookies (e.g., accessToken) in the request
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export function AuthButton() {
  const { data, isFetching, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    retry: 1,
  });

  if (isFetching) return null;

  return !data || error ? (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  ) : (
    <Avatar className="h-9 w-9 overflow-hidden border">
      <AvatarImage
        src={data.image}
        alt={data.usernam}
      />
      <AvatarFallback>{data.firstName[0] + data.lastName[0]}</AvatarFallback>
    </Avatar>
  );
}
