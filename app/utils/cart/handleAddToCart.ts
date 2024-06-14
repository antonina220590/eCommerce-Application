// export enum CartUpdateAction {
//   UpdateCart,
//   UpdateQuantity,
// }

const handleAddToCart = async (
  id: string,
  amount: number = 1,
  action: string = 'UpdateCart'
) => {
  let myCartDraft;

  if (action === 'UpdateCart') {
    myCartDraft = {
      currency: 'USD',
      lineItems: [
        {
          productId: id,
          variantId: 1,
          quantity: amount,
        },
      ],
    };
  }

  if (action === 'UpdateQuantity') {
    myCartDraft = {
      lineItems: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: id,
          quantity: amount,
        },
      ],
    };
  }

  console.log('myCartDraft', myCartDraft);

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
    console.error('Add to cart failed:', error);
    return { success: false };
  }
};

export default handleAddToCart;
