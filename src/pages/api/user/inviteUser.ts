import { api } from '../config/api-config';
import { getCookie } from 'cookies-next';
import axios, { AxiosError } from 'axios';

export const inviteUser = async (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  try {
    const accessToken = getCookie(`accessToken`);
    if (!accessToken) return (window.location.href = `/error`);
    const res = await api.post(
      `https://acoha.store/invite/${adminCode}?channelCode=${channelName}`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return err.response.data;
      }
    }
  }
};
