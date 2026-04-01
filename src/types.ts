export interface SearchParams {
    url: string
    occupations: string
    dataPoints: string[]
    database?: string
    collection?: string
}

export interface SearchResponse {
    data: {
        contacts: Record<string, string | number | null>[];
    }
    time: number;
}