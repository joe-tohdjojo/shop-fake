'use client';

import { ActionDispatch, useReducer } from 'react';

import { CartItems } from '@/components/page/cart/CartItems';
import { PromoCode } from '@/components/page/cart/PromoCode';
import { OrderSummary } from '@/components/page/cart/OrderSummary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/site-config';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxQuantity: number;
};

export type CartState = {
  cartItems: CartItem[];
  promoCode: string;
  promoApplied: boolean;
};

type Action = {
  type: string;
  payload?: string | boolean | number | { itemId: number; newQuantity: number };
};

export type Dispatch = ActionDispatch<[action: Action]>;

const initialState: CartState = {
  cartItems: [],
  promoCode: '',
  promoApplied: false,
};

export const SET_PROMO_CODE = 'SET_PROMO_CODE';
export const SET_PROMO_APPLIED = 'SET_PROMO_APPLIED';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case SET_PROMO_CODE:
      return {
        ...state,
        promoCode: action.payload as string,
      };
    case SET_PROMO_APPLIED:
      return {
        ...state,
        promoApplied: action.payload as boolean,
        promoCode: '',
      };
    case SET_CART_ITEMS:
      const payload = action.payload as { itemId: number; newQuantity: number };
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.itemId
            ? { ...item, quantity: payload.newQuantity }
            : item,
        ),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export function WithCartState({
  initialCartItems,
}: {
  initialCartItems: CartItem[];
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    cartItems: initialCartItems,
  });

  return state.cartItems.length > 0 ? (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        {/* Cart Items */}
        <CartItems
          state={state}
          dispatch={dispatch}
        />
        <PromoCode
          state={state}
          dispatch={dispatch}
        />
      </div>

      {/* Order Summary */}
      <OrderSummary state={state} />
    </div>
  ) : (
    <Card>
      <CardContent className="flex flex-col items-center py-12">
        <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mb-6 text-muted-foreground">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Button asChild>
          <a href={`${ROUTES.SHOP.path}/category/all`}>Continue Shopping</a>
        </Button>
      </CardContent>
    </Card>
  );
}
