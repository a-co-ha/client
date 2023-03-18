import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENV_URL}`,
});
console.log(process.env.NEXT_PUBLIC_ENV_URL);
