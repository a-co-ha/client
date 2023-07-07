import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getChannelPages } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { GetChannelPages as pages } from '@/pages/api/editable/type';
import { useSetRecoilState } from 'recoil';
import { channelNameState, channelImageState } from '@/recoil/project/atom';

export const useGetChannelPages = (
  channelId: string | string[] | undefined
) => {
  const setChannelName = useSetRecoilState(channelNameState);

  return useQuery<pages, AxiosError>(
    [`channelPages`, channelId],
    () => getChannelPages(channelId),
    {
      enabled: !!channelId,
      onSuccess: async (data) => {
        setChannelName(data?.channelName);
      },
    }
  );
};
