import { useGetNotice } from '@/hooks/queries/main/useGetNotice';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import type { NoticeProps } from './Notices';

export interface NoticeDetailProps extends NoticeProps {
  selectNoticeId: string;
  changeNoticeFormStatus: (status: boolean) => void;
}

export default function NoticeDetail({
  setActiveComponent,
  selectNoticeId,
  changeNoticeFormStatus,
}: NoticeDetailProps) {
  const { channelId } = useGetUrlInfo();
  const { data } = useGetNotice(selectNoticeId, channelId);

  return (
    <div css={Container}>
      <div css={Content}>
        <div css={Title}>
          <h4>제목: {data?.title}</h4>
          <button
            css={EditButton}
            onClick={() => {
              changeNoticeFormStatus(true);
              setActiveComponent('form');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
        <p>{data?.content}</p>
      </div>
    </div>
  );
}
const Container = css`
  height: 11rem;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const EditButton = css`
  padding: 0.3rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const Content = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  word-wrap: break-word;
`;

const Title = css`
  display: flex;
  border-bottom: solid;
  border-color: gray;
  justify-content: space-between;
  align-items: center;
`;
