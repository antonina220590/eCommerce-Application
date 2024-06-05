// 'use client';

// import React, { ReactNode } from 'react';
// import style from '@/app/ui/components/breadcrumb/breadcrumb.module.scss';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import clsx from 'clsx';

// type TBreadCrumbProps = {
//   homeElement: ReactNode;
//   separator: ReactNode;
//   containerClasses?: string;
//   listClasses?: string;
//   activeClasses?: string;
//   capitalizeLinks?: boolean;
// };

// function NextBreadcrumb({
//   homeElement,
//   separator,
//   containerClasses,
//   listClasses,
//   activeClasses,
//   capitalizeLinks,
// }: TBreadCrumbProps) {
//   const paths = usePathname();
//   const pathNames = paths.split('/').filter((path) => path);
//   console.log(pathNames);

//   return (
//     <div>
//       <ul className={clsx(style.breadcrumbContainer)}>
//         <li className={listClasses}>
//           <Link className={clsx(style.breadcrumbLink)} href="/">
//             {homeElement}
//           </Link>
//         </li>
//         {pathNames.length > 0 && separator}
//         {pathNames.map((link, index) => {
//           if (link === 'category') {
//             // const href = `/${pathNames.slice(7, -1).join('/')}`;
//             const href = `/${pathNames.slice(0, index + 1).join('/')}`;
//             console.log('hjjjh-', href);
//             const itemLink = capitalizeLinks
//               ? link[0].toUpperCase() + link.slice(1, link.length)
//               : link;
//             console.log(itemLink);
//           } else {
//             const href = `/${pathNames.slice(0, index + 1).join('/')}`;
//             const itemClasses =
//               paths === href ? `${listClasses} ${activeClasses}` : listClasses;
//             const itemLink = capitalizeLinks
//               ? link[0].toUpperCase() + link.slice(1, link.length)
//               : link;

//             return (
//               <React.Fragment key={index}>
//                 <li className={itemClasses}>
//                   <Link className={clsx(style.breadcrumbLink)} href={href}>
//                     {itemLink}
//                   </Link>
//                 </li>
//                 {pathNames.length !== index + 1 && separator}
//               </React.Fragment>
//             );
//           }
//         })}
//       </ul>
//     </div>
//   );
// }

// export default NextBreadcrumb;
