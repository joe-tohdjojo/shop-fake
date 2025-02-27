'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/common/Rating';

// Sample product data
const relatedProducts = [
  {
    id: 2,
    image: '/image/300x300',
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    rating: 4.6,
  },
  {
    id: 3,
    image: '/image/300x300',
    name: 'Premium Speaker System',
    price: 499.99,
    rating: 4.9,
  },
  {
    id: 4,
    image: '/image/300x300',
    name: 'Gaming Headset Elite',
    price: 249.99,
    rating: 4.7,
  },
];

export const RelatedProducts = () => {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((related) => (
          <Card key={related.id}>
            <CardHeader className="p-0">
              <Image
                alt={related.name}
                className="h-48 w-full rounded-t-lg object-cover"
                height={250}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${related.image}`}
                unoptimized
                width={250}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2 text-lg">{related.name}</CardTitle>
              <Rating
                score={related.rating}
                count={0}
              />
              <div className="mt-2">
                <span className="text-lg font-bold">
                  ${related.price.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
