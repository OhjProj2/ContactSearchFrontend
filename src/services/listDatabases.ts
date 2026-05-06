const API_URL = `${import.meta.env.VITE_BACKEND_URL}/listdbs`;

export const listDatabases = async (): Promise<string[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Failed to fetch databases: ${response.status}`);
  return response.json();
};