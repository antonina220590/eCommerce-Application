// import { Cart } from '@commercetools/platform-sdk/dist/declarations/src';

// const handleCart = async (
//   formData: Cart,
//   setError: (_error: string | null) => void
// ) => {
//   setError(null);
//   try {
//     const response = await fetch('/api/auth/carts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();
//     console.log(result);
//     if (response.ok) {
//       return { success: true };
//     }
//     setError(result?.error);
//     return { success: false };
//   } catch (error) {
//     console.error('Cart creation failed:', error);
//     setError('Cart creation failed due to some error');
//     return { success: false };
//   }
// };

// export default handleCart;
