import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ProductImages({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-center lg:w-1/2">
      <Carousel className="w-full">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                alt={`${product.title} - View ${index + 1}`}
                className="w-full rounded-lg"
                height={480}
                src={image}
                unoptimized
                width={480}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
