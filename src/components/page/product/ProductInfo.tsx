'use client';

import { useState } from 'react';
import {
  Heart,
  Package,
  RefreshCw,
  Share2,
  ShoppingCart,
  Truck,
} from 'lucide-react';

import { Rating } from '@/components/common/Rating';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductVariants } from '@/components/page/product/ProductVariants';

export function ProductInfo({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="lg:w-1/2">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-2 flex items-center justify-between">
            <Rating
              score={product.rating}
              count={product.reviews.length}
            />
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isWishlisted ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share Product</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div>
          <span className="text-3xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            {product.stock} in stock
          </span>
        </div>

        <Separator />

        {/* Variants */}
        <ProductVariants />

        {/* Add to Cart */}
        <div className="flex gap-4">
          <Button
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
          >
            Buy Now
          </Button>
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <Truck className="mb-2 h-6 w-6" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <Package className="mb-2 h-6 w-6" />
            <span className="text-sm">Secure Packaging</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <RefreshCw className="mb-2 h-6 w-6" />
            <span className="text-sm">30-Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
