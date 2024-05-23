// import fetchAllProducts from '@/app/utils/products/fetchAllProducts';

// // Function component defined using a function declaration
// export default async function Catalog() {
//   let products = [];
//   try {
//     const response = await fetchAllProducts();
//     products = response.results;
//   } catch (error) {
//     console.error('Failed to load products', error);
//   }

//   return (
//     <div>
//       <h1>Catalog</h1>
//       <div>
//         {products.map((product) => (
//           <div key={product.id}>
//             <h2>{product.name['en-US']}</h2>
//             <ul>
//               {Object.entries(product).map(([key, value]) => (
//                 <li key={key}>
//                   <strong>{key}:</strong> {JSON.stringify(value)}
//                 </li>
//               ))}
//             </ul>
//             {product.masterVariant.images &&
//             product.masterVariant.images.length > 0 ? (
//               <img
//                 src={product.masterVariant.images[0].url}
//                 alt={product.name.en}
//               />
//             ) : (
//               <p>No image available</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
