'use client';

import clsx from 'clsx';
import style from '@/app/ui/components/cards/cards.module.scss';
import React, { useEffect, useState } from 'react';
import fetchProductsFromCart from '@/app/utils/cart/fetchProductsFromCart';
import handleAddToCart from '@/app/utils/cart/handleAddToCart';
import { LineItem } from '@commercetools/platform-sdk';

export default function Cart() {
  const [products, setProducts] = useState<LineItem[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchProductsFromCart();
      // console.log('fetched cart --> ', fetched.cartData.lineItems);
      setProducts(fetched.cartData.lineItems);
      setTotalPrice(fetched.cartData.totalPrice.centAmount);
    };

    fetchProducts().catch(console.error);
  }, []);

  const handleQuantityChange = async (
    id: string,
    quantity: number,
    action: string
  ) => {
    const cartUpdate = await handleAddToCart(id, quantity, action);
    console.log('cartUpdate', cartUpdate);
    if (cartUpdate.success) {
      const fetched = await fetchProductsFromCart();
      // console.log('fetched cart UPD --> ', fetched);
      setProducts(fetched.cartData.lineItems);
      setTotalPrice(fetched.cartData.totalPrice.centAmount);
    }
  };

  return (
    <div>
      <h2>Total Price - ${totalPrice / 100}</h2>
      {products ? (
        <div className={clsx(style.productsList)}>
          {products.map((product) => (
            <div key={product.productId}>
              <p> {product.name['en-US']}</p>
              <p> {product.productId}</p>
              <div>
                amount in cart - {product.quantity}
                <br />
                <input
                  type="number"
                  min={1}
                  defaultValue={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.id,
                      parseInt(e.target.value, 10),
                      'UpdateQuantity'
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p> ...loading... </p>
      )}
    </div>
  );
}
