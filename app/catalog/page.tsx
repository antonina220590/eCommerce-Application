import React from 'react';
import Cards from '../ui/components/cards/Cards';
import CategoryLinks from '../ui/components/categoryLinks/categoryLinks';

function Catalog() {
  return (
    <main>
      <CategoryLinks />
      <Cards />
    </main>
  );
}
export default Catalog;
