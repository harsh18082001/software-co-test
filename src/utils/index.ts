import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://test-mock-api.vercel.app',
    timeout: 10000, // 10 seconds
    headers: { 'Content-Type': 'application/json' }
});

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
    axiosInstance
}