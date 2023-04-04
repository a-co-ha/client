import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import * as styles from './styles';
import type { pageProps } from '@/pages/api/editable/type';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const { data: socketData } = useGetSocketPage(channelId, pageId, type);
  return (
    <div css={styles.chatPage}>
      <div>chatpage</div>
    </div>
  );
};
