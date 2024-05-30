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

  const fetchSortedProducts = async (sortingOption: string) => {
    try {
      // Make API request with sorting parameter
      const sortedProducts = await fetchAllProducts({ sort: sortingOption });
      setProducts(sortedProducts.products);
    } catch (error) {
      console.error('Failed to fetch sorted products:', error);
    }
  };

  const handleSortingChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = event.target.value;
    await fetchSortedProducts(selectedOption);
  };

  return (
    <div>
      <div>
        {/* Sorting Interface */}
        <label htmlFor="sorting">
          Sort by:
          <select id="sorting" onChange={handleSortingChange}>
            <option value="">Select...</option>
            <option value="price asc">Price (Low to High) ↗️</option>
            <option value="price desc">Price (High to Low) ↘️</option>
            <option value="name.en asc">Name (A to Z) 🆎</option>
            <option value="name.en desc">Name (Z to A) 🅱️</option>
          </select>
        </label>
      </div>
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
                </div>
              );
            })}
          </div>
        ) : (
          <p> ...loading... </p>
        )}
      </div>
    </div>
  );
}
