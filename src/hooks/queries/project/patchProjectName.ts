import type {
  ProjectChangeInfoResponse,
  ProjectChangeName,
} from '@/components/navbar/type';
import { patchProjectName } from '@/pages/api/project/patchProjectName';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export const usePatchProjectName = (
  channelId: string | string[] | undefined
) => {
  const userId = getCookie(`myUserId`);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<ProjectChangeInfoResponse, AxiosError, ProjectChangeName>(
    [`patchProjectName`, userId],
    (projectInfo) => patchProjectName(channelId, projectInfo.projectChangeName),
    {
      onSuccess: async (data) => {
        if (data) {
          await queryClient.invalidateQueries([`user`, userId]);
          await queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
