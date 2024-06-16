const handleRemoveFromCart = async (id: string) => {
  const myCartDraft = {
    lineItems: [
      {
        action: 'removeLineItem',
        lineItemId: id,
      },
    ],
  };

  //   console.log('myCartDraft', myCartDraft);

  try {
    const response = await fetch('/api/create-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myCartDraft),
    });

    const result = await response.json();
    console.log('cart updating result:', result);

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Add to cart failed:', error);
    return { success: false };
  }
};

export default handleRemoveFromCart;
