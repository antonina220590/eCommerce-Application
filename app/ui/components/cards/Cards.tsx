import clsx from 'clsx';
import style from '@/app/ui/components/cards/cards.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import fetchAllProducts from '@/app/utils/products/fetchAllProducts';
import { Product } from '@/app/types/product';

export default async function Cards() {
  let products: Product[] = [];
  try {
    const response = await fetchAllProducts();
    products = response.results.map((product) => ({
      ...product,
      hasStagedChanges: !!product.hasStagedChanges,
      published: !!product.published,
    }));
  } catch (error) {
    throw new Error('Failed to fetch products');
  }

  return (
    <div className={clsx(style.productsList)}>
      {products.map((product) => (
        <div
          id={product.id}
          className={clsx(style.productCard)}
          key={product.id}
        >
          <Link href={`/${product.key}`} className={clsx(style.productLink)}>
            <div className={clsx(style.imgBox)}>
              {product.masterVariant.images &&
              product.masterVariant.images.length > 0 ? (
                <Image
                  src={product.masterVariant.images[0].url}
                  alt={product.name['en-US']}
                  fill
                  sizes="max-width: 800px"
                  style={{ objectFit: 'scale-down' }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            {product.masterVariant.prices &&
            product.masterVariant.prices.length > 0 ? (
              <div className={clsx(style.productPrice)}>
                ${product.masterVariant.prices[0].value.centAmount / 100}
              </div>
            ) : (
              <div>Price not available</div>
            )}
            <h3 className={clsx(style.productName)}>{product.name['en-US']}</h3>
            <p className={clsx(style.productDescription)}>
              {product.metaDescription?.['en-US'] ?? 'No description available'}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
