import axios from 'axios';
import type { GetUser } from './types';

export const getUser: GetUser = async () => {
  const res = await axios.get(`/oauth/github`, {
    withCredentials: true,
  });
  document.cookie = '_gh_sess; SameSite=None Secure';
  console.log(res);
  const user = res.data.user;
  console.log(user);
  return user;
};

// headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//       'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
//       'Access-Control-Allow-Credentials': 'true',
//     },
