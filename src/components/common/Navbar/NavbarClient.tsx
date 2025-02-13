import React from 'react';
import Link from 'next/link';
import { Desktop } from '@/components/common/Navbar/Desktop';
import { Mobile } from '@/components/common/Navbar/Mobile';

export const NavbarClient = () => {
  return (
    <nav className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold"
            >
              S H P F K
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Desktop />

          {/* Mobile Menu Button */}
          <Mobile />
        </div>
      </div>
    </nav>
  );
};
