import { useState, useEffect } from 'react';
import api from '@/api/api';

export function useGet(url: string,deps:string[]) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    api.get(url)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url,...deps]);

  return { data, loading, error };
}

export function usePost(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (postBody: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(url, postBody);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}
