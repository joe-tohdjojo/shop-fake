import { Skeleton } from '@/components/ui/skeleton';

export function PageDataWrapperSkeleton() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ProductImages Skeleton */}
        <div className="lg:w-1/2">
          {/* Main Image Skeleton */}
          <Skeleton className="aspect-square w-full rounded-lg" />

          {/* Thumbnail Images Skeleton */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square w-full rounded-md"
              />
            ))}
          </div>
        </div>

        {/* ProductInfo Skeleton */}
        <div className="space-y-6 lg:w-1/2">
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-3/4" />

          {/* Price Skeleton */}
          <Skeleton className="h-6 w-24" />

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Stock Status Skeleton */}
          <Skeleton className="h-4 w-20" />

          {/* Variants Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-8 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>

      {/* ProductDetails Skeleton */}
      <div className="mt-12 space-y-6">
        {/* Tabs Skeleton */}
        <div className="flex gap-4 border-b">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-24"
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 w-full"
            />
          ))}
        </div>
      </div>

      {/* RelatedProducts Skeleton */}
      <div className="mt-16">
        {/* Section Title Skeleton */}
        <Skeleton className="mb-8 h-6 w-48" />

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="space-y-3"
            >
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
