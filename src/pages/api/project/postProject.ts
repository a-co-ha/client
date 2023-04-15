import { api } from '../config/api-config';
import { nanoId } from '@/utils/nanoId';
import type { ProjectName } from '@/components/project-sidebar/type';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const postProject = async (inputData: ProjectName) => {
  try {
    const res = await api.post(`/api/channel/create`, {
      channelName: inputData.projectName,
      blockId: nanoId(),
    });
    return res.data;
  } catch (err) {
    console.error(`33333`, err);
  }
};
/**
 * catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      // toast.error(err.response?.data.message);
      alert(err);
    } else {
      console.error(err);
    }
 */
