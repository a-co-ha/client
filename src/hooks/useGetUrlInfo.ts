import { useRouter } from 'next/router';

export const useGetUrlInfo = () => {
  const router = useRouter();
  const { id: channelId, pageId, type } = router.query;

  return { channelId, pageId, type };
};
