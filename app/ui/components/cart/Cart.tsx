'use client';

import clsx from 'clsx';
import style from '@/app/ui/components/cards/cards.module.scss';
import React, { useEffect, useState } from 'react';
import fetchProductsFromCart from '@/app/utils/cart/fetchProductsFromCart';
import { LineItem } from '@commercetools/platform-sdk';

export default function Cart() {
  const [products, setProducts] = useState<LineItem[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchProductsFromCart();
      console.log('fetched cart --> ', fetched.cartData.lineItems);
      setProducts(fetched.cartData.lineItems);
    };

    fetchProducts().catch(console.error);
  }, []);

  return (
    <div>
      {products ? (
        <div className={clsx(style.productsList)}>
          {products.map((product) => (
            <p key={product.id}> {product.name['en-US']}</p>
          ))}
        </div>
      ) : (
        <p> ...loading... </p>
      )}
    </div>
  );
}
