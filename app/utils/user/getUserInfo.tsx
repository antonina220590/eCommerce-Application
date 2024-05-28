const getUserInfo = async () => {
  try {
    const response = await fetch(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details: ${response.status} ${response.statusText}`
      );
    }

    const userData = await response.json();
    // console.log(userData);

    return userData;
  } catch (error) {
    console.error('Failed to fetch product', error);
    throw error;
  }
};

export default getUserInfo;
