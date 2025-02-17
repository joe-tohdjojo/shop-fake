import { ProductDetails } from '@/components/page/product/ProductDetails';
import { ProductImages } from '@/components/page/product/ProductImages';
import { ProductInfo } from '@/components/page/product/ProductInfo';
import { RelatedProducts } from '@/components/page/product/RelatedProducts';
import { fetchSingleProduct } from '@/lib/fetchSingleProduct';

export async function PageDataWrapper({ productId }: { productId: string }) {
  const product = await fetchSingleProduct({ productId });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>
      <ProductDetails product={product} />
      <RelatedProducts />
    </>
  );
}
