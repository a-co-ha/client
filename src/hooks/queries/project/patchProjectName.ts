import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { patchProjectName } from '@/pages/api/project/patchProjectName';
import { useSetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { patchProjectDefaultImage } from '@/pages/api/project/patchProjectDefaultImage';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';
import type {
  ProjectChangeInfo,
  ProjectChangeInfoResponse,
} from '@/components/navbar/type';

export const usePatchProjectName = (
  channelId: string | string[] | undefined
) => {
  const userId = getCookie(`myUserId`);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<ProjectChangeInfoResponse, AxiosError, ProjectChangeInfo>(
    [`patchProjectName`, userId],
    (projectInfo) => patchProjectName(channelId, projectInfo.projectChangeName),
    {
      onSuccess: async (data) => {
        if (data) {
          await queryClient.invalidateQueries([`user`, userId]);
        }
      },
    }
  );
};
