import type {
  ProjectChangeInfoResponse,
  ProjectChangeName,
} from '@/components/navbar/type';
import { patchProjectName } from '@/pages/api/project/patchProjectName';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';

export const usePatchProjectName = (
  channelId: string | string[] | undefined
) => {
  const userId = getCookie(`myUserId`);
  const queryClient = useQueryClient();
  const setChannelName = useSetRecoilState(channelNameState);

  return useMutation<ProjectChangeInfoResponse, AxiosError, ProjectChangeName>(
    [`patchProjectName`, userId],
    (projectInfo) => patchProjectName(channelId, projectInfo.projectChangeName),
    {
      onSuccess: async (data) => {
        if (data) {
          setChannelName(data.channelName);
          await queryClient.invalidateQueries([`user`, userId]);
          await queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
