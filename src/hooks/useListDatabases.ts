import { useState, useEffect } from "react";
import { databaseList } from "../services/api";

export const useListDatabases = () => {
  const [databases, setDatabases] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const data = await databaseList();
        setDatabases(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabases();
  }, []);

  return { databases, loading, error };
};
