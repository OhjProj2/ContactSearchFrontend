export interface SearchParams {
    url: string
    occupations: string
    selectedFields: { [key: string]: boolean}  
}

export interface SearchResponse {
    data: {
        contacts: Record<string, string | number | null>[];
    }
    time: number;
}