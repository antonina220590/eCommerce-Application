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
    console.error('Failed to load products', error);
    throw new Error('Failed to fetch products');
  }

  return (
    <div>
      <h1>Catalog</h1>
      <div>
        {products.map((product) => (
          <div id={`product-${product.id}`}>
            <h2>{product.name['en-US']}</h2>
            <ul>
              {Object.entries(product).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </li>
              ))}
            </ul>
            {product.masterVariant.images &&
            product.masterVariant.images.length > 0 ? (
              <img
                src={product.masterVariant.images[0].url}
                alt={product.name['en-US']}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
