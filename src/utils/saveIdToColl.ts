const API_URL = `${import.meta.env.VITE_BACKEND_URL}/copybyid`;

export async function saveIdToColl(id: string) {
  
    const payload = {
        id: id,
        db_name: "targetdb", // MUST BE CHANGED TO USE SELECTED DB after needed feature is created
        col_name: "targetcol" // MUST BE CHANGED TO USE SELECTED COLLECTION after needed feature is created
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
