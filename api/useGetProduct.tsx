import { useState, useEffect } from "react";

export function useGetProduct(id: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}?populate=*`;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setResult(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
