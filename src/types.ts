export interface SearchParams {
    url: string
    occupations: string[]
    dataPoints: string[]  
}

export interface SearchResponse {
    id: string;
    data: {
        contacts: Record<string, string | number | null>[];
    }
    time: number;
}