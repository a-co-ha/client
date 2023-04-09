import { updateLabel } from '@/pages/api/editable/updateLabel';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePutLabel = (names: string[]) => {
  const router = useRouter();
  const { id: channelId, pageId } = router.query;
  useMutation(() => updateLabel(channelId, pageId, names));
};
