import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { fetchFeaturedProducts } from '@/lib/fetchFeaturedProducts';
import { ROUTES } from '@/site-config';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Rating } from '@/components/common/Rating';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Rating component

export async function FeaturedProducts() {
  const { data, error } = await fetchFeaturedProducts();

  if (error) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Button
          asChild
          variant="ghost"
        >
          <Link href={`${ROUTES.SHOP.path}/shop/category/all`}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {data?.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader className="relative p-0">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      alt={product.title}
                      className="h-full w-full rounded-t-lg object-cover"
                      height={300}
                      src={product.thumbnail}
                      unoptimized
                      width={300}
                    />
                  </AspectRatio>
                  {product.badge && (
                    <Badge
                      className={cn('absolute right-4 top-4', {
                        'bg-chart-2': product.badge === 'Eco-Friendly',
                        'bg-chart-3': product.badge === 'Best Seller',
                        'bg-chart-4 text-primary':
                          product.badge === 'Top Rated',
                      })}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  <CardTitle className="mb-2">{product.title}</CardTitle>
                  <Rating score={product.rating} />
                  <div className="mt-4">
                    <span className="text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
