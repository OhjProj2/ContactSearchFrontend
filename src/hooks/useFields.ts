import { useState, useEffect } from "react";

export type Field = {
  label: string;
  value: string;
};

export function useFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeField = (field: string | Field): Field =>
    typeof field === "string"
      ? { label: field, value: field }
      : { label: field.label, value: field.value };

  useEffect(() => {
    async function fetchFields() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/listfields`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: Array<string | Field> = await res.json();
        setFields(data.map(normalizeField));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFields();
  }, []);

  return { fields, loading, error };
}
