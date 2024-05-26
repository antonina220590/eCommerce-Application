'use client';

import { Product } from '@commercetools/platform-sdk';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';

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
  console.log(product);

  return <div>{product && <h1>{product.id}</h1>}</div>;
}
export default ProductDetails;
