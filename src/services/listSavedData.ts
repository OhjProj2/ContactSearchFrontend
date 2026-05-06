const API_URL = import.meta.env.VITE_BACKEND_URL;

export const listSavedData = async (
  dbName: string,
  collectionName: string,
): Promise<string[]> => {

  try {
    const response = await fetch(
      `${API_URL}/listallcontactdata?db_name=${dbName}&db_collection=${collectionName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch saved data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Fetched saved data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching saved data:', error);
    throw error;
  }
};




