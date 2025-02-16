import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/page/home/Hero';
import { FeaturedProducts } from '@/components/page/home/FeaturedProducts';
import { CategoriesPreview } from '@/components/page/home/CategoriesPreview';
import { Newsletter } from '@/components/page/home/Newsletter';

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Preview Section */}
      <CategoriesPreview />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
