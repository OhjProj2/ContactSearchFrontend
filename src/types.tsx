export interface SearchRequest {
    url: string;
    occupation: string[];
    contactDetails: string[]
}

export interface Contact {
    name: string;
    email?: string;
    phone?: string;
    role?: string;
    source?: string;
}

export interface SearchResponse {
    contacts: Contact[];
}