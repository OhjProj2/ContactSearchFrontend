export interface SearchParams {
  url: string[];
  occupations: string[];
  dataPoints: string[];
}

export interface SearchResponse {
  id: string[];
  data: {
    contacts: Record<string, string | number | null>[];
  };
  time: number;
}

export interface SaveParams {
  ids: string[];
  db_name: string;
  col_name: string;
}
