async function fetchDiscountDetails(id: string) {
  try {
    const response = await fetch(`/api/catalog/product-discounts?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch discount details: ${response.status} ${response.statusText}`
      );
    }

    const discount = await response.json();
    // console.log('fetched discount-> ', discount);
    return discount;
  } catch (error) {
    console.error('Failed to fetch discount details', error);
    throw error;
  }
}

export default fetchDiscountDetails;
