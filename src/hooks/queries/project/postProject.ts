import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { postProject } from '@/pages/api/project/postProject';
import { useSetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { patchProjectImage } from '@/pages/api/project/patchProjectImage';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import type { PostProject } from '@/pages/api/project/type';
import type { ProjectName } from '@/components/project-sidebar/type';

export const usePostProject = () => {
  const setChannelName = useSetRecoilState(channelNameState);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<PostProject, AxiosError, ProjectName>(
    (channelName) => postProject(channelName),
    {
      onSuccess: (data) => {
        if (data) {
          patchProjectImage(data.id);
          queryClient.invalidateQueries([`user`]);
          setChannelName(data.channelName);
          router.push(`/project/${data.id}`);
        }
      },
    }
  );
};
