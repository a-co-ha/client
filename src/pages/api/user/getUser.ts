import axios from 'axios';
import type { GetUser } from './types';

export const getUser: GetUser = async () => {
  const res = await axios.get(`/api/user`);
  console.log(res);
  const user = res.data.user;
  // console.log(user);
  return user;
};
