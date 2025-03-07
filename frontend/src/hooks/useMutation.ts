import { useState } from 'react';

interface UseMutationProps<T, V> {
  fn: (variables: V) => Promise<T>;
}

export const useMutation = <T, V>({ fn }: UseMutationProps<T, V>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = async (
    variables: V,
    {
      onSuccess,
      onError
    }: {
      onSuccess?: (data: T) => void;
      onError?: (error: Error) => void;
    } = {}
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fn(variables);
      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};
