import { useGetNotice } from '@/hooks/queries/main/useGetNotice';
import { css } from '@emotion/react';

import type { NoticeProps } from './Notice';

interface NoticeDetailProps extends NoticeProps {
  selectNoticeId: string;
}

export default function NoticeDetail({
  setActiveComponent,
  selectNoticeId,
}: NoticeDetailProps) {
  const { data } = useGetNotice(selectNoticeId);
  console.log('🚀 ~ file: NoticeDetail.tsx:6 ~ NoticeDetail ~ data:', data);

  return (
    <div css={Content}>
      <h4>{data?.title}</h4>
      <p>{data?.content}</p>
      <button css={ToListButton} onClick={() => setActiveComponent('list')}>
        {`< 목록으로`}
      </button>
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
