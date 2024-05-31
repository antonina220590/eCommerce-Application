async function fetchAllProducts(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const decodedString = queryString.replace(/\+/g, ' ');
    const url = `/api/catalog/products${decodedString ? `?${decodedString}` : ''}`;
    console.log(url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const products = await response.json();
    console.log('products fetched -> ', products);

    return products;
  } catch (error) {
    console.error('Failed to fetch products', error);
    throw error;
  }
}

export default fetchAllProducts;
