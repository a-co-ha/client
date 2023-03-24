import axios from 'axios';
export const api = axios.create({
  baseURL: `http://ec2-3-36-123-5.ap-northeast-2.compute.amazonaws.com`,
  // baseURL: `${
  //   process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
  //     ? process.env.NEXT_PUBLIC_ENV_URL
  //     : process.env.NEXT_PUBLIC_DEV_SERVER_URL
  // }`,
  withCredentials: true,
});
console.log('여기', process.env.NEXT_PUBLIC_DEV_SERVER_URL);
