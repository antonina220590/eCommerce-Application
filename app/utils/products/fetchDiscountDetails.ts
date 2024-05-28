async function fetchDiscountDetails(discountId: string) {
  try {
    const response = await fetch(`/api/catalog/discounts/${discountId}`, {
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
    return discount;
  } catch (error) {
    console.error('Failed to fetch discount details', error);
    throw error;
  }
}

export default fetchDiscountDetails;
