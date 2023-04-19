import { api } from '../config/api-config';
import { getCookie } from 'cookies-next';

export const inviteUser = async (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  const accessToken = getCookie(`accessToken`);
  if (!accessToken) window.location.href = `/error`;

  const res = await api.post(`/invite/${adminCode}?channelCode=${channelName}`);
  return res.data;
};
