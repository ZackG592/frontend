import { useState } from "react";
import api from "@/api/api";

export function useDelete(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(url);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
}