import axios from 'axios';
export const api = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? process.env.NEXT_PUBLIC_ENV_URL
      : process.env.NEXT_PUBLIC_DEV_SERVER_URL
  }`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
console.log('여기', process.env.NEXT_PUBLIC_DEV_SERVER_URL);
