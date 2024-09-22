import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { toast } from 'react-toastify';

import { axiosInstance } from 'src/utils';

type TUseGet<T> = [T | null, boolean, Dispatch<SetStateAction<T | null>>, () => void]

const useGet = <T>(url: string): TUseGet<T> => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadKey, setReloadKey] = useState(0);

    const reload = () => setReloadKey(reloadKey + 1);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance(url);
            setData(response.data);
        } catch (error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, reloadKey]);

    return [data, loading, setData, reload];
};

export default useGet;