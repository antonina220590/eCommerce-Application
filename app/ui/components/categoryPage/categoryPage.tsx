'use client';

import fetchAllProducts from '@/app/utils/products/fetchAllProducts';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import style from '@/app/ui/components/cards/cards.module.scss';
import styles from '@/app/ui/components/categoryLinks/categoryLinks.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryBooks() {
  const [products, setProducts] = useState<ProductPagedQueryResponse | null>(
    null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchAllProducts(14, 0);
      setProducts(fetched.products);
    };
    fetchProducts().catch(console.error);
  }, []);

  const currentPath = window.location.pathname;
  const currentPathId = currentPath.split('/')[2];

  return (
    <div>
      {products ? (
        <div className={clsx(style.productsList)}>
          {products.results.map((product) => {
            const { categories } = product.masterData.current;
            const ids = categories?.[0];
            const { id } = ids;

            if (id === currentPathId) {
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
                </div>
              );
            }
            <div />;
            return <div className={clsx(styles.noLinks)} key={product.id} />;
          })}
        </div>
      ) : (
        <p>...loading...</p>
      )}
    </div>
  );
}
