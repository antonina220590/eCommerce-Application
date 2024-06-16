import { parseCookies } from 'nookies';

async function fetchProductsFromCart() {
  const cookies = parseCookies();
  const { cartId } = cookies;

  try {
    if (!cartId) {
      return [];
    }

    const response = await fetch(`/api/my-cart?id=${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from cart: ${response.status} ${response.statusText}`
      );
    }

    const products = await response.json();
    // console.log('products fetched -> ', products);

    return products;
  } catch (error) {
    console.error('Failed to fetch products', error);
    throw error;
  }
}

export default fetchProductsFromCart;
