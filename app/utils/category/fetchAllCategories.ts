async function fetchAllCategories() {
  try {
    const response = await fetch(`/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details: ${response.status} ${response.statusText}`
      );
    }

    const categories = await response.json();
    // console.log('categories fetched -> ', categories);

    return categories;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
}

export default fetchAllCategories;
