const API_URL = `${import.meta.env.VITE_BACKEND_URL}/listcollections`;

export const listCollections = async (dbName: string): Promise<string[]> => {
  const response = await fetch(`${API_URL}?db_name=${dbName}`);
  if (!response.ok) throw new Error(`Failed to fetch collections: ${response.status}`);
  return response.json();
};