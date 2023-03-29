import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { postProject } from '@/pages/api/project/postProject';
import type { AxiosError } from 'axios';
import type { PostProject } from '@/pages/api/project/type';
import type { ProjectName } from '@/components/project-sidebar/type';

export const usePostProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<PostProject, AxiosError, ProjectName>(
    (channelName) => postProject(channelName),
    {
      onSuccess: (data) => {
        router.push(`/project/${data.id}`);
        queryClient.invalidateQueries([`user`]);
      },
    }
  );
};
