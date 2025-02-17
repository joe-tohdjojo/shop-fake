import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoriesPreviewSkeleton() {
  return (
    <section className="bg-accent/50 py-16">
      <div className="container mx-auto px-4">
        <Skeleton className="mb-8 h-9 w-48" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <AspectRatio ratio={1 / 1}>
                  <Skeleton className="h-full w-full rounded-t-lg" />
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mx-auto h-6 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            size="lg"
            disabled
          >
            Explore All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
