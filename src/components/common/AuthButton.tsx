'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

export function AuthButton() {
  const { data, isFetching, error } = useUser();

  if (isFetching) return null;

  return !data || error ? (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  ) : (
    <Avatar className="h-9 w-9 overflow-hidden border">
      <AvatarImage
        src={data.image}
        alt={data.username}
      />
      <AvatarFallback>{data.firstName[0] + data.lastName[0]}</AvatarFallback>
    </Avatar>
  );
}
