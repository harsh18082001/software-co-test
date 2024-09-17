import { useState, useEffect, useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from 'src/utils';

const useFetch = <T>(url: string, options: AxiosRequestConfig<any> = {}): [T | null, boolean, any] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance(url, options);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return [data, loading, error];
};

export default useFetch;