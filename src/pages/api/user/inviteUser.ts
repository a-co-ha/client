import { api } from '../config/api-config';

export const inviteUser = async (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  const res = await api.post(`/invite/${adminCode}?channelCode=${channelName}`);
  return res.data;
};
