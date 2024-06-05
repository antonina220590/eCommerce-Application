'use client';

import CategoryBooks from '@/app/ui/components/categoryPage/categoryPage';
import SubcategoryLinks from '@/app/ui/components/categoryLinks/subcategoryLinks';

export default function Category() {
  return (
    <main>
      <SubcategoryLinks />
      <CategoryBooks />
    </main>
  );
}
