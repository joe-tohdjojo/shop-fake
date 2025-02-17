import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PageDataWrapperSkeleton() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Cart Items */}
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardContent className="flex gap-4 p-4">
                {/* Product Image Skeleton */}
                <Skeleton className="h-24 w-24 flex-shrink-0 rounded-md" />

                <div className="flex-grow space-y-2">
                  {/* Product Name Skeleton */}
                  <Skeleton className="h-5 w-2/3" />

                  <div className="flex items-center justify-between">
                    {/* Price Skeleton */}
                    <Skeleton className="h-4 w-20" />

                    {/* Quantity Controls Skeleton */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-12 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Promo Code Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-grow rounded" />
                <Skeleton className="h-10 w-24 rounded" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="space-y-4 p-6">
              <Skeleton className="h-6 w-32" />

              {/* Summary Items */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>

              {/* Checkout Button */}
              <Skeleton className="h-12 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
