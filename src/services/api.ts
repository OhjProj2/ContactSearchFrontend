import type { SearchParams, SearchResponse } from "../types";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/seek/`;
const DATABASE_LIST_URL = `${import.meta.env.VITE_BACKEND_URL}/listdbs/`;
const COLLECTIONS_LIST_URL = `${import.meta.env.VITE_BACKEND_URL}/listcollections`;


export const databaseList = async (): Promise<string[]> => {
  const response = await fetch(DATABASE_LIST_URL);
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
  }
  const result: string[] = await response.json();
  return result;
}

export const listCollections = async (dbName: string): Promise<string[]> => {
  const response = await fetch(`${COLLECTIONS_LIST_URL}?db_name=${dbName}`);
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
  }
  const result: string[] = await response.json();
  return result;
}

export const searchContacts = async (params: SearchParams): Promise<SearchResponse> => {
  const payload = {
    occupations: [params.occupations],
    contact_details: ["occupation", ...params.dataPoints],
    url: params.url,
    database: params.database,
    collection: params.collection
  };

  console.log(payload);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
  }


  const result: SearchResponse = await response.json();
  return result;
}
