import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';

async function fetchUserData(token: string) {
  // console.log('fetchUserData -> ', token);
  try {
    const response = await fetch(`${apiUrl}/${projectKey}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details: ${response.status} ${response.statusText}`
      );
    }

    const userData = await response.json();
    // console.log('User data fetched:', userData);
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data');
    throw error;
  }
}

export default fetchUserData;
