import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductsGridSkeleton() {
  // Create an array of 6 items to show as skeleton placeholders
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 24 }).map((_, index) => (
        <Card
          key={index}
          className="flex flex-col"
        >
          <CardHeader className="relative p-2">
            <Skeleton className="h-48 w-full rounded-t-lg" />
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-1/4" />
            <Skeleton className="mb-2 h-16 w-full" />
            <Skeleton className="mb-4 h-4 w-24" />
            <div className="mt-4">
              <Skeleton className="mb-2 h-6 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
