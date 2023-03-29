import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteProject } from '@/pages/api/project/deleteProject';
import { useResetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import type { AxiosError } from 'axios';
import type { DeleteProject } from '@/pages/api/project/type';

export const useDeleteProject = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  const channelNameReset = useResetRecoilState(channelNameState);

  return useMutation<DeleteProject, AxiosError>(
    [`deleteProject`, channelId],
    () => deleteProject(channelId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user`]);
        channelNameReset();
      },
    }
  );
};
