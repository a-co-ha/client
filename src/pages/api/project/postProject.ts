import axios from 'axios';
import type { ProjectTitle } from '@/components/project-sidebar/types';

export const postProject = async (projectTitle: ProjectTitle) => {
  const res = await axios.post(`/api/channel/create`, {
    channelName: projectTitle,
  });
  return { id: res.data.id, channelName: res.data.channelName };
};
