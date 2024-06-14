'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
// import  useCallback from 'react';
import fetchProductsFromCart from '@/app/utils/cart/fetchProductsFromCart';
import { LineItem } from '@commercetools/platform-sdk';
import styles from '@/app/ui/components/cart/cart.module.scss';
import Image from 'next/image';

export default function Cart() {
  const [products, setProducts] = useState<LineItem[] | null>(null);
  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchProductsFromCart();
      console.log('fetched cart --> ', fetched.cartData.lineItems);
      setProducts(fetched.cartData.lineItems);
    };

    fetchProducts().catch(console.error);
  }, []);

  // const handleIncrease = useCallback(() => {
  //   // Это на всякий случай. Вдруг тебе пригодится

  // }, []);

  // const handleDecrease = useCallback(() => {
  //   // Это на всякий случай. Вдруг тебе пригодится

  // }, []);

  return (
    <div className={clsx(styles.basketWrapper)}>
      <h1 className={clsx(styles.basketTitle)}>Shopping Cart</h1>
      {products ? (
        <div className={clsx(styles.cartList)}>
          <div className={clsx(styles.upperBox)}>
            <div className={clsx(styles.cartProduct)}>Product</div>
            <div className={clsx(styles.cartPriceInitial, styles.cartColums)}>
              Price
            </div>
            <div className={clsx(styles.cartQuantity, styles.cartColums)}>
              Quantity
            </div>
            <div className={clsx(styles.cartPriceTotal, styles.cartColumsEnd)}>
              Total
            </div>
          </div>
          {products.map((product) => (
            <div className={clsx(styles.cartContainer)} key={product.id}>
              <div className={clsx(styles.productBox)}>
                <div className={clsx(styles.imgCartBox)}>
                  {product.variant.images &&
                  product.variant.images.length > 0 ? (
                    <Image
                      src={product.variant.images[0].url}
                      alt={product.name['en-US']}
                      priority
                      fill
                      sizes="max-width: 800px"
                      style={{ objectFit: 'scale-down' }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className={clsx(styles.nameBox)}>
                  <span className={clsx(styles.productName)}>
                    {product.name['en-US']}
                  </span>
                </div>
              </div>
              <div className={clsx(styles.infoPrice)}>
                {product.price ? (
                  <div className={clsx(styles.productPrice)}>
                    <span className={clsx(styles.fullPrice)}>
                      ${(product?.price?.value?.centAmount || 0) / 100}
                    </span>
                  </div>
                ) : (
                  <div>Price not available</div>
                )}
              </div>
              <div className={clsx(styles.infoQuantity)}>
                <div className={clsx(styles.quantityBox)}>
                  <button
                    type="button"
                    className={clsx(styles.qtyBtn)}
                    // onClick={handleDecrease}
                  >
                    -
                  </button>
                  <div>{1}</div>
                  <button
                    type="button"
                    className={clsx(styles.qtyBtn)}
                    // onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              {product.price ? (
                <div className={clsx(styles.infoTotal)}>
                  ${(product?.totalPrice?.centAmount || 0) / 100}
                </div>
              ) : (
                <div>Price not available</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}
