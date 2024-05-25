'use client';

import clsx from 'clsx';
import style from '@/app/ui/components/cards/cards.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import fetchAllProducts from '@/app/utils/products/fetchAllProducts';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

export default function Cards() {
  const [products, setProducts] = useState<ProductPagedQueryResponse | null>(
    null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await fetchAllProducts();
      setProducts(fetched.products);
    };

    fetchProducts().catch(console.error);
  }, []);
  console.log(products);

  return (
    <div>
      {products?.results ? (
        <div className={clsx(style.productsList)}>
          {products.results.map((product) => (
            <div
              id={product.id}
              className={clsx(style.productCard)}
              key={product.id}
            >
              <Link
                href={`/${product.key}`}
                className={clsx(style.productLink)}
              >
                <div className={clsx(style.imgBox)}>
                  {product.masterData.current.masterVariant.images &&
                  product.masterData.current.masterVariant.images.length > 0 ? (
                    <Image
                      src={
                        product.masterData.current.masterVariant.images[0].url
                      }
                      alt={product.masterData.current.name['en-US']}
                      fill
                      sizes="max-width: 800px"
                      style={{ objectFit: 'scale-down' }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                {product.masterData.current.masterVariant.prices &&
                product.masterData.current.masterVariant.prices.length > 0 ? (
                  <div className={clsx(style.productPrice)}>
                    $
                    {product.masterData.current.masterVariant.prices[0].value
                      .centAmount / 100}
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
          ))}
        </div>
      ) : (
        <p> ...loading... </p>
      )}
    </div>
  );
}
