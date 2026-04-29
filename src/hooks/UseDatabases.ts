import { useState, useEffect } from "react";
import { listDatabases } from "@/services/listDatabases";

export function useDatabases() {
  const [databases, setDatabases] = useState<string[]>([]);

  useEffect(() => {
    listDatabases()
      .then((dbs) => {
        setDatabases(dbs);
        console.log("Fetched databases: ", dbs);
      })
      .catch(err => console.error("Error fetching databases: ", err));
  }, []);

  return { databases };
}