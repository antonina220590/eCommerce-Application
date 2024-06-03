'use client';

import clsx from 'clsx';
import styles from '@/app/ui/components/categoryLinks/categoryLinks.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import fetchAllCategories from '@/app/utils/category/fetchAllCategories';

export default function CategoryLinks() {
  const [categories, setCategories] =
    useState<CategoryPagedQueryResponse | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetched = await fetchAllCategories();
      setCategories(fetched.categories);
    };
    fetchCategories().catch(console.error);
  }, []);

  const results = categories?.results;
  return (
    <div className={clsx(styles.linksBox)}>
      <div className={clsx(styles.categoryListWrapper)}>
        {results ? (
          results?.map((result) => {
            if (result?.orderHint === '1') {
              return (
                <Link
                  key={result.id}
                  href={`/category/${result.id}`}
                  className={clsx(styles.productLink)}
                >
                  <h4
                    className={clsx(styles.categoryLink)}
                  >{`${Object.values(result.name).toString()}`}</h4>
                </Link>
              );
            }
            return <div className={clsx(styles.noLinks)} key={result.id} />;
          })
        ) : (
          <p> ...loading...</p>
        )}
      </div>
    </div>
  );
}
