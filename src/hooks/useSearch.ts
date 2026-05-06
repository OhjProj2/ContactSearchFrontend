import { useState } from "react";
import { searchContacts } from "../services/searchContacts";
import type { SearchResponse, SearchParams } from "../types";

export function useSearch() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async (params: SearchParams) => {
    setResults(null);
    setLoading(true);
    try {
      const data = await searchContacts(params);
      setResults(data);
      setLoading(false);
    } catch {
      setResults(null);
      setLoading(false);
    }
  };

  return { results, loading, search };
}