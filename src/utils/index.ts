import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: 'https://test-mock-api.vercel.app',
    timeout: 10000, // 10 seconds
    headers: { 'Content-Type': 'application/json' }
});

const postData = async (config: AxiosRequestConfig<any>) => {
    // not throwing error because of demo api (json server) throws error on every post and patch but data operation is done
    try {
        const res = await axiosInstance(config);
        return res;
    } catch {
    //     toast.error('Something went wrong :(')
    //     return null as any;
    }
}

const genrateId = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result.match(/.{1,4}/g)!.join("-");
}

export {
    genrateId,
    axiosInstance,
    postData,
}