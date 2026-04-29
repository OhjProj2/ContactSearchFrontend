import { useState, useEffect } from "react";
import { listCollections } from "@/services/listCollections";

export function useCollections(dbName: string) {
  const [collections, setCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dbName) {
      setCollections([]);
      return;
    }
    setLoading(true);
    listCollections(dbName)
      .then(setCollections)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dbName]);

  return { collections, loading, error };
}