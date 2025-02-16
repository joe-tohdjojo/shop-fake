import Link from 'next/link';

import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ROUTES } from '@/site-config';
import { fetchProductCategories } from '@/lib/fetchProductCategories';

export async function Desktop() {
  const { data: categories, error } = await fetchProductCategories();

  if (error) return <>Unable to fetch categories</>;

  return categories?.map((category) => (
    <NavigationMenuLink
      asChild
      key={category.slug}
    >
      <Link href={`${ROUTES.SHOP.path}/category/${category.slug}`}>
        {category.name}
      </Link>
    </NavigationMenuLink>
  ));
}

export async function Mobile() {
  const { data: categories, error } = await fetchProductCategories();

  if (error)
    return <SidebarMenuSubItem>Unable to fetch categories</SidebarMenuSubItem>;

  return categories?.map((category) => (
    <SidebarMenuSubItem key={category.slug}>
      <SidebarMenuSubButton asChild>
        <Link href={`${ROUTES.SHOP.path}/category/${category.slug}`}>
          {category.name}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  ));
}
