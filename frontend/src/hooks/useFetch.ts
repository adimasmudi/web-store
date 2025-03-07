import { useEffect, useState } from 'react';

interface UseFetchProps<T> {
  fn: () => Promise<T>;
}

export const useFetch = <T>({ fn }: UseFetchProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fn();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fn]);

  return { data, isLoading, error };
};
