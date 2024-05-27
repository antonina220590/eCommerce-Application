async function fetchAllProducts() {
  try {
    const response = await fetch(`/api/catalog/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details: ${response.status} ${response.statusText}`
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
