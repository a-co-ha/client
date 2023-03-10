import axios from 'axios';
import type { GetUser } from './types';

export const getUser: GetUser = async () => {
  const res = await axios.get(`http://localhost:3001/api/user`, {
    withCredentials: true,
  });
  console.log(res);
  const user = res.data.user;
  console.log(user);
  return user;
};
