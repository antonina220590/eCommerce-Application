'use client';

import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import Image from 'next/image';

export default function SliderBig() {
  const [thumbsSwiper, setThumbsSwiper] = useState<
    string | SwiperClass | null | undefined
  >(null)!;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[2];
    const fetchProduct = async () => {
      const fetched = await fetchProductById(id);
      setProduct(fetched.products);
    };
    fetchProduct().catch(console.error);
  }, []);

  const images = product?.masterData.current.masterVariant.images;

  return (
    <>
      <Swiper
        loop
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mySwiper3"
      >
        {images?.map((image, id) => (
          <SwiperSlide key={`${image.url}-${id + 4}`}>
            <Image
              src={image.url}
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'scale-down' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[Navigation, Thumbs]}
        className="mySwiper4"
      >
        {images?.map((image, id) => (
          <SwiperSlide key={`${image.url}-${id + 4}`}>
            <Image
              src={image.url}
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'scale-down' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
