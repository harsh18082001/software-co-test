import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from 'src/utils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

type TUseFetch<T> = [T | null, boolean, Dispatch<SetStateAction<T | null>>, () => void]

const useFetch = <T>(url: string, options: AxiosRequestConfig<any> | null, updateData: any): TUseFetch<T> => {
    const dispatch = useDispatch();

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadKey, setReloadKey] = useState(0);

    const reload = () => setReloadKey(reloadKey + 1);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance(url, options = {});
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

    useEffect(() => {
        dispatch(updateData({ data, loading }));
    }, [data]);

    return [data, loading, setData, reload];
};

export default useFetch;