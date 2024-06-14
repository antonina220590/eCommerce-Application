const handleAddToCart = async (productId: string) => {
  const myCartDraft = {
    currency: 'USD',
    lineItems: [
      {
        productId,
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  try {
    const response = await fetch('/api/create-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myCartDraft),
    });

    const result = await response.json();
    console.log('cart creating result', result);

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false };
  }
};

export default handleAddToCart;
