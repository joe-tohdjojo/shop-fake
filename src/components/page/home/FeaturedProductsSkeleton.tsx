import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedProductsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Button
          variant="ghost"
          disabled
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
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
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader className="relative p-0">
                  <AspectRatio ratio={1 / 1}>
                    <Skeleton className="h-full w-full rounded-t-lg" />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="h-4 w-24" />
                  <div className="mt-4">
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
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
