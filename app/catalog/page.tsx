import React from 'react';
import Cards from '../ui/components/cards/Cards';
import CategoryLinks from '../ui/components/categoryLinks/categoryLinks';
import LoadMore from '../ui/components/loadMore/loadMore';

function Catalog() {
  return (
    <main>
      <CategoryLinks />
      <Cards />
      <LoadMore />
    </main>
  );
}
export default Catalog;
