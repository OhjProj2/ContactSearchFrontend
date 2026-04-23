import { useState, useEffect } from "react";

export type Model = {
  name: string;
};

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/listmodels`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setModels(data.models || []);
      } catch (err) {
        console.error("Failed to fetch models:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  return { models, loading };
}