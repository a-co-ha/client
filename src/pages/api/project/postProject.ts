import axios from 'axios';
import type { ProjectName } from '@/components/project-sidebar/types';

export const postProject = async (inputData: ProjectName) => {
  const res = await axios.post(`/api/channel/create`, {
    channelName: inputData.projectName,
  });
  console.log('여기는 postProject안', res.data);
  return { id: res.data.id, channelName: res.data.channelName };
};
