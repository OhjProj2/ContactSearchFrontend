import type { SearchResponse } from "../types";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/seek/`;

interface SearchParams {
    url: string
    occupations: string
    selectedFields: { [key: string]: boolean}
    
}

export const searchContacts = async (params: SearchParams): Promise<SearchResponse> => {

    const activeFields = Object.keys(params.selectedFields).filter(
        (key) => params.selectedFields[key]
    );

    const payload = {
        occupations: [params.occupations],
        contact_details: ["occupation", ...activeFields],
        url: params.url
    };

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