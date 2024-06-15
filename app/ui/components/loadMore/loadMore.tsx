'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import fetchAllProducts from '@/app/utils/products/fetchAllProducts';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import Link from 'next/link';
import style from '@/app/ui/components/cards/cards.module.scss';
import handleAddToCart from '@/app/utils/cart/handleAddToCart';
import styles from './loadmore.module.scss';
import Spinner from '../../../../public/spinner.svg';

let limit = 3;
const offset = 6;
export default function LoadMore() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<ProductPagedQueryResponse | null>(
    null
  );
  const [isSpinner, setSpinner] = useState(true);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (inView) {
      const fetchProducts = async () => {
        const fetched = await fetchAllProducts(limit, offset);
        setProducts(fetched.products);
        if (products) {
          if (products.total) {
            if (products.limit < products.total) {
              limit += 1;
            } else {
              setSpinner(false);
              limit = products.total;
            }
          }
        }
      };

      fetchProducts().catch(console.error);
    }
  }, [inView, products]);

  const addToCart = async (productId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [productId]: true }));
      const result = await handleAddToCart(productId);
      console.log('Product added to cart:', result);
      setIsLoading((prev) => ({ ...prev, [productId]: false }));
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setIsLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <>
      <div>
        {products?.results ? (
          <div className={clsx(style.productsList)}>
            {products.results.map((product) => {
              const price =
                product.masterData.current.masterVariant.prices?.[0];
              const discountedPrice = price?.discounted?.value?.centAmount;
              const originalPrice = price?.value?.centAmount || 0;
              return (
                <div
                  id={product.id}
                  role="presentation"
                  className={clsx(style.productCard)}
                  key={product.id}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className={clsx(style.productLink)}
                  >
                    <div className={clsx(style.imgBox)}>
                      {product.masterData.current.masterVariant.images &&
                      product.masterData.current.masterVariant.images.length >
                        0 ? (
                        <Image
                          src={
                            product.masterData.current.masterVariant.images[0]
                              .url
                          }
                          alt={product.masterData.current.name['en-US']}
                          priority
                          fill
                          sizes="max-width: 800px"
                          style={{ objectFit: 'scale-down' }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    {price ? (
                      <div className={clsx(style.productPrice)}>
                        {discountedPrice ? (
                          <>
                            <div className={clsx(style.saleMark)}>Sale</div>
                            <span className={clsx(style.fullPrice)}>
                              ${originalPrice / 100}
                            </span>
                            <span className={clsx(style.discountedPrice)}>
                              ${discountedPrice / 100}
                            </span>
                          </>
                        ) : (
                          <span>${originalPrice / 100}</span>
                        )}
                      </div>
                    ) : (
                      <div>Price not available</div>
                    )}
                    <h3 className={clsx(style.productName)}>
                      {product.masterData.current.name['en-US']}
                    </h3>
                    <p className={clsx(style.productDescription)}>
                      {product.masterData.current.metaDescription?.['en-US'] ??
                        'No description available'}
                    </p>
                  </Link>
                  <button
                    onClick={() => addToCart(product.id)}
                    className={clsx(style.productButton)}
                    style={
                      isLoading[product.id]
                        ? { backgroundColor: '#1B3764', color: '#FFCA42' }
                        : {}
                    }
                    type="button"
                  >
                    Add to Card {isLoading[product.id] && <Spinner />}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p />
        )}
      </div>
      <div
        className={clsx(styles.spinnerBox, {
          [styles.spinnerBox_invisible]: !isSpinner,
        })}
        ref={ref}
      >
        <Image src="./spinner.svg" alt="spinner" width={56} height={56} />
      </div>
    </>
  );
}
