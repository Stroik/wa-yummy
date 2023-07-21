import axios, { AxiosInstance } from 'axios';

function customAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return instance;
}
export const _axios = customAxios();

export const setUser = (id: string) => {
  _axios.defaults.headers.common['userid'] = id;
};
