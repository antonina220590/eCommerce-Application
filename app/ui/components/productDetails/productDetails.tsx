'use client';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import { Product } from '@commercetools/platform-sdk';
import style from '@/app/ui/components/productDetails/productDetails.module.scss';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from '@/app/ui/components/slider/slider';

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const toggleTextFullVisibility = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[2];
    const fetchProduct = async () => {
      const fetched = await fetchProductById(id);
      setProduct(fetched.products);
    };
    fetchProduct().catch(console.error);
  }, []);

  return (
    <div>
      {product ? (
        <div className={clsx(style.productPageWrapper)}>
          <div className={clsx(style.productInsideContainer)}>
            <div className={clsx(style.productLeftSideContainer)}>
              {product.masterData.current.masterVariant.images &&
              product.masterData.current.masterVariant.images.length > 0 ? (
                <div className={clsx(style.sliderBox)}>
                  <div className={clsx(style.sliderInnerBox)}>
                    <Slider />
                  </div>
                </div>
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className={clsx(style.productRightSideContainer)}>
              <h3 className={clsx(style.productTitle)}>
                {product.masterData.current.name['en-US']}
              </h3>
              <div
                className={clsx(
                  !open
                    ? style.productFullDescription
                    : style.productFullDescription_open
                )}
              >
                <p className={clsx(style.productDescriptionText)}>
                  {product.masterData.current.description?.['en-US'] ??
                    'No description available'}
                </p>
                <div
                  className={clsx(
                    !open
                      ? style.productFullDescriptionBottom
                      : style.productFullDescriptionBottom_open
                  )}
                />
              </div>
              <button
                className={clsx(style.productDescriptionButton)}
                type="button"
                onClick={toggleTextFullVisibility}
              >
                {!open ? 'Read more...' : 'Read less...'}
              </button>
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
