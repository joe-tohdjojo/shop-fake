'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export function AuthButton() {
  const { data, isFetching, error, logout } = useUser();

  if (isFetching) return null;

  return !data || error ? (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9 overflow-hidden border">
          <AvatarImage
            src={data.image}
            alt={data.username}
          />
          <AvatarFallback>
            {data.firstName[0] + data.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="w-full p-2"
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
