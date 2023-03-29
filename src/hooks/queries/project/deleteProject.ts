import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteProject } from '@/pages/api/project/deleteProject';
import type { AxiosError } from 'axios';
import type { DeleteProject } from '@/pages/api/project/type';

export const useDeleteProject = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<DeleteProject, AxiosError>(
    [`deleteProject`],
    () => deleteProject(channelId),
    {
      onSuccess: () => {
        if (channelId) {
          queryClient.invalidateQueries([`user`]);
        }
      },
    }
  );
};
