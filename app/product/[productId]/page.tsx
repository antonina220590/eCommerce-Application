'use client';

import React from 'react';
import ProductDetails from '@/app/ui/components/productDetails/productDetails';
import style from '@/app/ui/components/productDetails/productDetails.module.scss';

export default function Product() {
  return (
    <main className={style.productMain}>
      <ProductDetails />
    </main>
  );
}
