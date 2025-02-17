import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartState } from '@/components/page/cart/WithCartState';

export function OrderSummary({ state }: { state: CartState }) {
  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const discount = state.promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="lg:w-96">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {state.promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
