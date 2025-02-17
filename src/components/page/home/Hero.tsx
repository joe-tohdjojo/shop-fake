import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/site-config';

export function Hero() {
  return (
    <section className="relative h-[500px] bg-accent">
      <div className="container mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Discover Amazing Products
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Shop the latest trends and innovations with our curated collection
            of premium products.
          </p>
          <Button
            asChild
            className="mr-4"
            size="lg"
          >
            <Link href={`${ROUTES.SHOP.path}/category/all`}>
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
          >
            <Link href={`${ROUTES.SHOP.path}/category/all`}>
              View Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
