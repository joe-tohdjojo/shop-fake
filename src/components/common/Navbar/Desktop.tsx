import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ROUTES } from '@/site-config';
import { Search } from '@/components/common/Search';
import { Suspense } from 'react';
import { Categories } from './Categories';

export async function Desktop() {
  return (
    <div className="hidden items-center space-x-6 md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              asChild
              variant="link"
            >
              <Link href={ROUTES.SHOP.path}>Shop</Link>
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                <Suspense fallback={<>Fetching categories...</>}>
                  <Categories.Desktop />
                </Suspense>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Search />
    </div>
  );
}
