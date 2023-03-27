import { useMutation } from '@tanstack/react-query';
import { postProject } from '@/pages/api/project/postProject';
import type { AxiosError } from 'axios';
import type { PostProject } from '@/pages/api/project/type';
import type { ProjectName } from '@/components/project-sidebar/type';

export const usePostProject = () => {
  return useMutation<PostProject, AxiosError, ProjectName>((channelName) =>
    postProject(channelName)
  );
};
