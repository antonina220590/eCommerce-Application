'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import fetchProductsFromCart from '@/app/utils/cart/fetchProductsFromCart';
import handleAddToCart from '@/app/utils/cart/handleAddToCart';
import handleRemoveFromCart from '@/app/utils/cart/handleRemoveFromCart';
import handleRemoveAllFromCart from '@/app/utils/cart/handleRemoveAllFromCart';
import { LineItem } from '@commercetools/platform-sdk';
import styles from '@/app/ui/components/cart/cart.module.scss';
import Image from 'next/image';

export default function Cart() {
  const [products, setProducts] = useState<LineItem[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartId, setCartId] = useState<string>('');
  const [cartVersion, setCartVersion] = useState<number>(0);
  const [cartClearSuccessMessage, setCartClearSuccessMessage] =
    useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchProductsFromCart();
      setProducts(fetched?.cartData?.lineItems);
      // console.log('fetched?.cartData --> ', fetched?.cartData);
      setTotalPrice(fetched?.cartData?.totalPrice?.centAmount);
      setCartId(fetched?.cartData?.id);
      setCartVersion(fetched?.cartData?.version);
    };

    fetchProducts().catch(console.error);
  }, []);

  const handleQuantityChange = async (
    id: string,
    quantity: number,
    action: string
  ) => {
    const cartUpdate = await handleAddToCart(id, quantity, action);
    // console.log('cartUpdate', cartUpdate);
    if (cartUpdate.success) {
      const fetched = await fetchProductsFromCart();
      // console.log('fetched cart UPD --> ', fetched);
      setProducts(fetched?.cartData?.lineItems);
      setTotalPrice(fetched?.cartData?.totalPrice?.centAmount);
      setCartVersion(fetched?.cartData?.version);
    }
  };

  const handleRemoveProduct = async (id: string) => {
    console.log(id);
    const cartUpdate = await handleRemoveFromCart(id);
    // console.log('cartUpdate', cartUpdate);
    if (cartUpdate.success) {
      const fetched = await fetchProductsFromCart();
      // console.log('fetched cart UPD --> ', fetched);
      setProducts(fetched.cartData.lineItems);
      setTotalPrice(fetched.cartData.totalPrice.centAmount);
    }
  };

  const handleCartClear = async (id: string, version: number) => {
    // console.log(id);
    const clearCart = await handleRemoveAllFromCart(id, version);
    // console.log('clearCart', clearCart);
    if (clearCart.success) {
      const fetched = await fetchProductsFromCart();
      // console.log('fetched cart UPD --> ', fetched);
      setProducts(fetched?.cartData?.lineItems);
      setTotalPrice(fetched?.cartData?.totalPrice?.centAmount);
      setCartClearSuccessMessage('Everything was deleted');
    }
  };

  return (
    <div className={clsx(styles.basketWrapper)}>
      <h3 className={clsx(styles.basketTitle)}>Shopping Cart</h3>
      {products?.length ? (
        <>
          <div className={clsx(styles.cartList)}>
            <div className={clsx(styles.upperBox)}>
              <div className={clsx(styles.cartProduct)}>Product</div>
              <div className={clsx(styles.cartPriceInitial, styles.cartColums)}>
                Price
              </div>
              <div className={clsx(styles.cartQuantity, styles.cartColums)}>
                Quantity
              </div>
              <div
                className={clsx(styles.cartPriceTotal, styles.cartColumsEnd)}
              >
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
                    <span
                      className={clsx(styles.productName, styles.cartPrices)}
                    >
                      {product.name['en-US']}
                    </span>
                    <button
                      className={clsx(styles.deleteBtn)}
                      type="button"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove from Cart
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
                  <input
                    className={clsx(styles.qtyInput)}
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
                {product.price ? (
                  <div className={clsx(styles.infoTotal, styles.cartPrices)}>
                    ${(product?.totalPrice?.centAmount || 0) / 100}
                  </div>
                ) : (
                  <div>Price not available</div>
                )}
              </div>
            ))}
          </div>
          <div className={clsx(styles.bottomBox)}>
            <button
              className={clsx(styles.deleteAllBtn)}
              type="button"
              onClick={() => handleCartClear(cartId, cartVersion)}
            >
              Clear Shopping Cart
            </button>
            <h4 className={clsx(styles.totalPrice)}>
              Total Price - ${totalPrice / 100}
            </h4>
          </div>
        </>
      ) : (
        <>
          <p>Cart is empty</p>

          {cartClearSuccessMessage}
        </>
      )}
    </div>
  );
}
