import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  CartState,
  Dispatch,
  SET_PROMO_APPLIED,
  SET_PROMO_CODE,
} from '@/components/page/cart/WithCartState';

export function PromoCode({
  state,
  dispatch,
}: {
  state: CartState;
  dispatch: Dispatch;
}) {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Input
            placeholder="Enter promo code"
            value={state.promoCode}
            onChange={(e) =>
              dispatch({ type: SET_PROMO_CODE, payload: e.target.value })
            }
          />
          <Button
            onClick={() =>
              state.promoCode.toLowerCase() === 'save10' &&
              dispatch({ type: SET_PROMO_APPLIED, payload: true })
            }
          >
            Apply
          </Button>
        </div>
        {state.promoApplied && (
          <div className="mt-2 flex items-center text-sm text-green-600">
            10% discount applied!
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4"
              onClick={() =>
                dispatch({ type: SET_PROMO_APPLIED, payload: false })
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
