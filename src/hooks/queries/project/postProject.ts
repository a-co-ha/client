import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { postProject } from '@/pages/api/project/postProject';
import { useSetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { patchProjectDefaultImage } from '@/pages/api/project/patchProjectDefaultImage';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';
import type { PostProject } from '@/pages/api/project/type';
import type { ProjectName } from '@/components/project-sidebar/type';

export const usePostProject = () => {
  const setChannelName = useSetRecoilState(channelNameState);
  const queryClient = useQueryClient();
  const router = useRouter();
  const userId = getCookie(`myUserId`);
  return useMutation<PostProject, AxiosError, ProjectName>(
    [`postProject`, userId],
    (channelName) => postProject(channelName),
    {
      onSuccess: async (data) => {
        if (data) {
          await patchProjectDefaultImage(data.id);
          await queryClient.invalidateQueries([`user`, userId]);
          setChannelName(data.channelName);
          router.push(`/project/${data.id}`);
        }
      },
    }
  );
};
