import type { SaveParams } from "@/types";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/copybyid`;

export const saveIdToColl = async (params: SaveParams) => {
  
    const payload = {
        id: params.id,
        db_name: params.db_name,
        col_name: params.col_name
    };

    console.log("trying to save data: ", payload);

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


    const result: string = await response.json();
    console.log(result);
    return result;
  }
