import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClearCartDialog } from '@/components/page/cart/ClearCartDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  CartState,
  Dispatch,
  REMOVE_CART_ITEM,
  SET_CART_ITEMS,
} from '@/components/page/cart/WithCartState';

export function CartItems({
  state,
  dispatch,
}: {
  state: CartState;
  dispatch: Dispatch;
}) {
  const updateQuantity = (payload: { itemId: number; newQuantity: number }) =>
    dispatch({ type: SET_CART_ITEMS, payload });
  const removeItem = (itemId: number) =>
    dispatch({ type: REMOVE_CART_ITEM, payload: itemId });

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cart Items ({state.cartItems.length})</CardTitle>
            <ClearCartDialog dispatch={dispatch} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Image
                        alt={item.name}
                        className="h-16 w-16 rounded object-cover"
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                        unoptimized
                        width={100}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) =>
                        updateQuantity({
                          itemId: item.id,
                          newQuantity: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(item.maxQuantity)].map((_, i) => (
                          <SelectItem
                            key={i + 1}
                            value={(i + 1).toString()}
                          >
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
