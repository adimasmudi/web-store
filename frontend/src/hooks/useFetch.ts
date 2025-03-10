import { useEffect, useState } from 'react';

interface UseFetchProps<T, P> {
  fn: (params: P) => Promise<T>;
  params: P;
  refetch?: boolean;
}

export const useFetch = <T, P>({
  fn,
  params,
  refetch
}: UseFetchProps<T, P>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fn(params);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fn, JSON.stringify(params), refetch]);

  return { data, isLoading, error };
};
