'use client';

import { Product } from '@commercetools/platform-sdk';
import style from '@/app/ui/components/productDetails/productDetails.module.scss';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[2];
    console.log(id);

    const fetchProduct = async () => {
      const fetched = await fetchProductById(id);
      setProduct(fetched.products);
      console.log(fetched);
    };
    fetchProduct().catch(console.error);
  }, []);
  console.log(product?.masterData.current.name);

  return (
    <div>
      {product ? (
        <div className={clsx(style.productPageWrapper)}>
          <div className={clsx(style.productInsideContainer)}>
            <div className={clsx(style.productLeftSideContainer)}>
              <div className={clsx(style.imgBox)}>
                {product.masterData.current.masterVariant.images &&
                product.masterData.current.masterVariant.images.length > 0 ? (
                  <Image
                    src={product.masterData.current.masterVariant.images[0].url}
                    alt={product.masterData.current.name['en-US']}
                    fill
                    sizes="max-width: 800px"
                    style={{ objectFit: 'scale-down' }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </div>
            <div className={clsx(style.productRightSideContainer)}>
              <h3 className={clsx(style.productTitle)}>
                {product.masterData.current.name['en-US']}
              </h3>
              <div className={clsx(style.productFullDescription)}>
                <p className={clsx(style.productDescriptionText)}>
                  {product.masterData.current.description?.['en-US'] ??
                    'No description available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p> ...loading... </p>
      )}
    </div>
  );
}
export default ProductDetails;
