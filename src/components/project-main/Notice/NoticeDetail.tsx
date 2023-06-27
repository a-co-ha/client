import { useGetNotice } from '@/hooks/queries/main/useGetNotice';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import type { NoticeProps } from './Notices';

export interface NoticeDetailProps extends NoticeProps {
  selectNoticeId: string;
}

export default function NoticeDetail({
  setActiveComponent,
  selectNoticeId,
}: NoticeDetailProps) {
  const { channelId } = useGetUrlInfo();
  const { data } = useGetNotice(selectNoticeId, channelId);

  console.log('🚀 ~ file: NoticeDetail.tsx:6 ~ NoticeDetail ~ data:', data);

  return (
    <div css={Content}>
      <button css={ToListButton} onClick={() => setActiveComponent('list')}>
        {`< 목록으로`}
      </button>
      <h4>{data?.title}</h4>
      <p>{data?.content}</p>
      <button onClick={() => setActiveComponent('form')}>수정하기</button>
    </div>
  );
}
const Content = css`
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  padding: 0.5rem;
`;

const ToListButton = css`
  align-self: start;
`;
