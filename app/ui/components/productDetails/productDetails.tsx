'use client';

import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import fetchProductById from '@/app/utils/product/fetchProductById';
import React, { useEffect, useState } from 'react';

function ProductDetails() {
  const [products, setProducts] = useState<ProductPagedQueryResponse | null>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      const fetched = await fetchProductById();
      setProducts(fetched.products);
      console.log(fetched);
    };
    fetchProduct().catch(console.error);
  }, []);
  console.log(products);

  return (
    <div>
      <p />
    </div>
  );
}
export default ProductDetails;
