import { useEffect, useState } from 'react';

interface FetchState<T> {
    isLoading: boolean;
    apiData: T | null;
    error: Error | null;
}

export function useFetch<T>(apiToCall: () => Promise<T>): FetchState<T> {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        apiToCall()
            .then(data => setApiData(data))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, []);

    return { isLoading, apiData, error };
}
