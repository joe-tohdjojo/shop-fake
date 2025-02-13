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
import Link from 'next/link';
import { ROUTES } from '@/site-config';
import { Suspense } from 'react';
import { Categories } from './Categories';

export async function Mobile() {
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
                      <Link href={ROUTES.SHOP.path}>{ROUTES.SHOP.name}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={ROUTES.CATEGORY.path}>
                        {ROUTES.CATEGORY.name}
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <Suspense fallback={<>Fetching categories...</>}>
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
