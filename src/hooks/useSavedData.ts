import { useState, useEffect } from "react";
import { listSavedData } from "@/services/listSavedData";

export function useSavedData(dbName: string, collectionName: string) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!dbName || !collectionName) {
      setData([]);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await listSavedData(dbName, collectionName);
        setData(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        console.error("Error fetching saved data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dbName, collectionName]);

  return { data, loading, error };
}
