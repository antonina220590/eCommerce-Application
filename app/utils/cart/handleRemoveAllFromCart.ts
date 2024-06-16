const handleRemoveAllFromCart = async (id: string, version: number) => {
  try {
    const response = await fetch(
      `/api/clear-cart?id=${id}&version=${version}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    console.log('cart clear result:', result);

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Cart clearing failed:', error);
    return { success: false };
  }
};

export default handleRemoveAllFromCart;
