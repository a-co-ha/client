import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { patchProjectImage } from '@/pages/api/project/patchProjectImage';
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

export const usePatchProjectImage = (
  channelId: string | string[] | undefined
) => {
  const userId = getCookie(`myUserId`);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<ProjectChangeInfoResponse, AxiosError, ProjectChangeInfo>(
    [`patchProjectImage`, userId],
    (projectInfo) =>
      patchProjectImage(channelId, projectInfo.projectChangeImage),
    {
      onSuccess: async (data) => {
        if (data) {
          await queryClient.invalidateQueries([`user`, userId]);
        }
      },
    }
  );
};
