'use client';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import { Product } from '@commercetools/platform-sdk';
import style from '@/app/ui/components/productDetails/productDetails.module.scss';
import styles from '@/app/ui/components/cards/cards.module.scss';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from '@/app/ui/components/slider/slider';
import Image from 'next/image';
import SliderBig from '@/app/ui/components/slider/sliderEnlarged';
import Modal from '../modal/modal';

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleTextFullVisibility = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[3];
    const fetchProduct = async () => {
      const fetched = await fetchProductById(id);
      setProduct(fetched.products);
    };
    fetchProduct().catch(console.error);
  }, []);

  const price = product?.masterData.current.masterVariant.prices?.[0];
  const discountedPrice = price?.discounted?.value?.centAmount;
  const originalPrice = price?.value?.centAmount || 0;

  return (
    <div>
      {product ? (
        <>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div>
              {product.masterData.current.masterVariant.images &&
              product.masterData.current.masterVariant.images.length > 1 ? (
                <div className={clsx(style.sliderBox)}>
                  <div className={clsx(style.sliderInnerBox)}>
                    <SliderBig />
                  </div>
                </div>
              ) : (
                <div className={clsx(style.imgBoxSlider)}>
                  {product.masterData.current.masterVariant.images &&
                  product.masterData.current.masterVariant.images.length > 0 ? (
                    <Image
                      src={
                        product.masterData.current.masterVariant.images[0].url
                      }
                      alt={product.masterData.current.name['en-US']}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'scale-down' }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              )}
            </div>
          </Modal>
          <div className={clsx(style.productPageWrapper)}>
            <div className={clsx(style.productInsideContainer)}>
              <div className={clsx(style.productLeftSideContainer)}>
                {product.masterData.current.masterVariant.images &&
                product.masterData.current.masterVariant.images.length > 1 ? (
                  <div className={clsx(style.sliderBox)}>
                    <div className={clsx(style.sliderInnerBox)}>
                      <Slider />
                    </div>
                  </div>
                ) : (
                  <div className={clsx(style.imgBox)}>
                    {product.masterData.current.masterVariant.images &&
                    product.masterData.current.masterVariant.images.length >
                      0 ? (
                      <Image
                        src={
                          product.masterData.current.masterVariant.images[0].url
                        }
                        alt={product.masterData.current.name['en-US']}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'scale-down' }}
                        onClick={() => setModalOpen(true)}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                )}
                <div className={clsx(style.productDetailsPrice)}>
                  {price ? (
                    <div className={clsx(style.productPrice)}>
                      {discountedPrice ? (
                        <>
                          <span className={clsx(style.fullPrice)}>
                            ${originalPrice / 100}
                          </span>
                          <span className={clsx(styles.discountedPrice)}>
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
                </div>
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
        </>
      ) : (
        <p> ...loading... </p>
      )}
    </div>
  );
}
export default ProductDetails;
