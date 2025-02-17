import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mt-12">
      <Tabs defaultValue="description">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent
          value="description"
          className="mt-6"
        >
          <Card>
            <CardContent className="pt-6">
              <p>{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="specifications"
          className="mt-6"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold">Dimensions:</span>{' '}
                  {product.dimensions.height}&quot; x {product.dimensions.width}
                  &quot; x {product.dimensions.depth}&quot;
                </div>
                <div>
                  <span className="font-bold">Weight:</span> {product.weight}
                  lbs.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
