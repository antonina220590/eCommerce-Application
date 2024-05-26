async function fetchProductByKey() {
  try {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[2];
    console.log(id);
    const response = await fetch(`/api/catalog/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details: ${response.status} ${response.statusText}`
      );
    }

    const product = await response.json();
    console.log('product fetched -> ', product);

    return product;
  } catch (error) {
    console.error('Failed to fetch product', error);
    throw error;
  }
}

export default fetchProductByKey;
