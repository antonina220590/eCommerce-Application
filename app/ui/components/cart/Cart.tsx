'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import fetchProductsFromCart from '@/app/utils/cart/fetchProductsFromCart';
import handleAddToCart from '@/app/utils/cart/handleAddToCart';
import { LineItem } from '@commercetools/platform-sdk';
import styles from '@/app/ui/components/cart/cart.module.scss';
import Image from 'next/image';

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
    <div className={clsx(styles.basketWrapper)}>
      <h3 className={clsx(styles.basketTitle)}>Shopping Cart</h3>
      <h3 className={clsx(styles.basketTitle)}>
        Total Price - ${totalPrice / 100}
      </h3>
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
                  <span className={clsx(styles.productName, styles.cartPrices)}>
                    {product.name['en-US']}
                  </span>
                  <button className={clsx(styles.deleteBtn)} type="button">
                    Delete
                  </button>
                </div>
              </div>
              <div className={clsx(styles.infoPrice, styles.cartPrices)}>
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
                    className={clsx(styles.qtyBtn, styles.cartPrices)}
                    // onClick={handleDecrease}
                  >
                    -
                  </button>
                  <div className={clsx(styles.cartPrices)}>{1}</div>
                  <button
                    type="button"
                    className={clsx(styles.qtyBtn, styles.cartPrices)}
                    // onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              {product.price ? (
                <div className={clsx(styles.infoTotal, styles.cartPrices)}>
                  ${(product?.totalPrice?.centAmount || 0) / 100}
                </div>
              ) : (
                <div>Price not available</div>
              )}
              <div>
                amount in cart
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
        <p>...loading</p>
      )}
    </div>
  );
}
