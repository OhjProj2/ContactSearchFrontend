export type Contact = Record<string, any>;

export interface SearchResponse {
    data: {
        contacts: Contact[];
    }
    time: number;
}