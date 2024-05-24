import clsx from 'clsx';
import style from '@/app/ui/components/cards/cards.module.scss';
import Image from 'next/image';
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
        <div id={product.id} className={clsx(style.productCard)}>
          <a href={`/${product.key}`}>
            {product.masterVariant.images &&
            product.masterVariant.images.length > 0 ? (
              <Image
                src={product.masterVariant.images[0].url}
                alt={product.name['en-US']}
                width={300}
                height={300}
                layout="responsive"
              />
            ) : (
              <p>No image available</p>
            )}
            {product.masterVariant.prices &&
            product.masterVariant.prices.length > 0 ? (
              <p>${product.masterVariant.prices[0].value.centAmount / 100}</p>
            ) : (
              <p>Price not available</p>
            )}
            <h3>{product.name['en-US']}</h3>
            <p>
              {product.metaDescription?.['en-US'] ?? 'No description available'}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}
