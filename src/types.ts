export interface SearchParams {
    url: string
    occupations: string
    dataPoints: string[]  
}

export interface SearchResponse {
    data: {
        contacts: Record<string, string | number | null>[];
    }
    time: number;
}