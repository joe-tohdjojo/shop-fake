import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import { ROUTES } from '@/site-config';

export function CategoriesPreview() {
  return (
    <section className="bg-accent/50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {['Electronics', 'Clothing', 'Home & Garden', 'Beauty'].map(
            (category) => (
              <Card
                key={category}
                className="group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src="https://dummyjson.com/image/300x300"
                      alt={category}
                      className="h-full w-full rounded-t-lg object-cover"
                      width={300}
                      height={300}
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-center">{category}</CardTitle>
                </CardContent>
              </Card>
            ),
          )}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
          >
            <Link href={ROUTES.CATEGORY.path}>
              Explore All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
