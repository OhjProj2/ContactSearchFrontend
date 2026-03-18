import { useState } from "react";
import { searchContacts } from "../services/api";
import type { SearchResponse, SearchParams } from "../types";

export function useContactSearch() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [status, setStatus] = useState("");

  const search = async (params: SearchParams) => {
    setResults(null);
    setStatus("Loading, please wait...");

    try {
      const data = await searchContacts(params);
      setResults(data);
      setStatus("");
    } catch {
      setResults(null);
      setStatus("Oops, something went wrong. Please try again.");
    }
  };

  return { results, status, search };
}