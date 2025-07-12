import { useState } from "react";
import api from "@/api/api";


export function usePut(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const putData = async (putBody: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(url, putBody);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
}