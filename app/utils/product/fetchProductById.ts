async function fetchProductByKey() {
  try {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/')[2];
    console.log(id);
    const response = await fetch(`/api/catalog/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify('4850654f-005c-4787-88e0-99ad4624a770'),
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
