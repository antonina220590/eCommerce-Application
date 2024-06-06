import fetch from 'node-fetch';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';

const setUserDateOfBirth = async (
  customerId: string,
  token: string,
  version: number,
  dateOfBirth: string
) => {
  const actions = [];

  actions.push({
    action: 'setDateOfBirth',
    dateOfBirth,
  });

  const requestBody = {
    version,
    actions,
  };

  // console.log('Updating data with -> ', JSON.stringify(requestBody));

  const updateResponse = await fetch(
    `${apiUrl}/${projectKey}/customers/${customerId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );

  // console.log(
  //   'Updating data with updateResponse -> ',
  //   JSON.stringify(updateResponse)
  // );
  return updateResponse;
};

export default setUserDateOfBirth;
