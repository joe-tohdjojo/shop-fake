import React, { Suspense } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/page/home/Hero';
import { FeaturedProducts } from '@/components/page/home/FeaturedProducts';
import { FeaturedProductsSkeleton } from '@/components/page/home/FeaturedProductsSkeleton';
import { CategoriesPreview } from '@/components/page/home/CategoriesPreview';
import { CategoriesPreviewSkeleton } from '@/components/page/home/CategoriesPreviewSkeleton';
import { Newsletter } from '@/components/page/home/Newsletter';

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar page={'home'} />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      {/* Categories Preview Section */}
      <Suspense fallback={<CategoriesPreviewSkeleton />}>
        <CategoriesPreview />
      </Suspense>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
