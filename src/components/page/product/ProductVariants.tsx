'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductVariants() {
  const [quantity, setQuantity] = useState('1');

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <Select
          value={quantity}
          onValueChange={setQuantity}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10)].map((_, i) => (
              <SelectItem
                key={i + 1}
                value={(i + 1).toString()}
              >
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
