import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { postProject } from '@/pages/api/project/postProject';
import type { AxiosError } from 'axios';
import type { PostProject } from '@/pages/api/project/type';
import type { ProjectName } from '@/components/project-sidebar/type';
import { useSetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';

export const usePostProject = () => {
  const setChannelName = useSetRecoilState(channelNameState);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<PostProject, AxiosError, ProjectName>(
    (channelName) => postProject(channelName),
    {
      onSuccess: (data) => {
        setChannelName(data.channelName);
        queryClient.invalidateQueries([`user`]);
        router.push(`/project/${data.id}`);
      },
    }
  );
};
