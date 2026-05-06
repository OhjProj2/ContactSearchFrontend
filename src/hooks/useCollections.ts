import { useState, useEffect } from "react";
import { listCollections } from "@/services/listCollections";

export function useCollections(dbName: string) {
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    if (!dbName) {
      setCollections([]);
      return;
    }
    listCollections(dbName)
      .then(setCollections)
      .catch(err => console.error("Error fetching collections: ", err));
  }, [dbName]);

  return { collections };
}