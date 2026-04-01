import type { SearchParams, SearchResponse } from "../types";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/seek/`;

export const searchContacts = async (params: SearchParams): Promise<SearchResponse> => {


    const payload = {
        occupations: params.occupations,
        contact_details: ["occupation", ...params.dataPoints],
        url: params.url
    };

    console.log(" sending request: ", payload);

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