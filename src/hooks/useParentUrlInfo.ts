import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useParentUrlInfo = (channelId: string) => {
  const router = useRouter();

  useEffect(() => {
    const { type, name } = router.query;

    if (
      typeof type === 'string' &&
      type.startsWith('template') &&
      typeof name === 'string'
    ) {
      const arr = [channelId, type, name];
      localStorage.setItem('parentPageInfo', JSON.stringify(arr));
    }
  }, [router.query]);
};
