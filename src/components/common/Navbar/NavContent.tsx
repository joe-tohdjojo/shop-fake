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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import * as Categories from '@/components/common/Navbar/Categories';
import { Suspense } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Desktop() {
  return (
    <div className="hidden items-center space-x-6 md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              asChild
              variant="link"
            >
              <Link href={`${ROUTES.SHOP.path}/category/all`}>Shop</Link>
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                <Suspense fallback={<>Loading...</>}>
                  <Categories.Desktop />
                </Suspense>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Search />
      <Button>Login</Button>
      <ThemeToggle />
    </div>
  );
}

export function Mobile() {
  return (
    <>
      <div className="md:hidden">
        <SidebarProvider className="max-h-fit min-h-0">
          <SidebarTrigger />
          <Sidebar side="right">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Search />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={`${ROUTES.SHOP.path}/category/all`}>
                        {ROUTES.SHOP.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={ROUTES.CATEGORY.path}>
                        {ROUTES.CATEGORY.name}
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <Suspense fallback={<>Loading...</>}>
                        <Categories.Mobile />
                      </Suspense>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
      </div>
    </>
  );
}
