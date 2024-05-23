import { apiRoot } from '@/app/utils/commercetools/commercetools-client';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

async function fetchAllProducts(): Promise<ProductProjectionPagedQueryResponse> {
  try {
    const response = await apiRoot.productProjections().get().execute();
    return response.body;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

export default fetchAllProducts;
