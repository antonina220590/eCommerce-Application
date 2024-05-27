async function fetchProductByKey(id: string) {
  try {
    const response = await fetch(`/api/catalog/product?id=${id}`, {
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
    // console.log('product fetched -> ', product);

    return product;
  } catch (error) {
    console.error('Failed to fetch product', error);
    throw error;
  }
}

export default fetchProductByKey;
