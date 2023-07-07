import type { ProjectName } from '@/components/project-sidebar/type';
import { nanoId } from '@/utils/nanoId';
import { api } from '../config/api-config';

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
