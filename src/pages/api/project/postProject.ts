import { api } from '../config/api-config';
import { nanoId } from '@/utils/nanoId';
import type { ProjectName } from '@/components/project-sidebar/type';

export const postProject = async (inputData: ProjectName) => {
  const res = await api.post(`/api/channel/create`, {
    channelName: inputData.projectName,
    blockId: nanoId(),
  });
  return res.data;
};
