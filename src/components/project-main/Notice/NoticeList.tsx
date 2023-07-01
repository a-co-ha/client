import { useDeleteNotice } from '@/hooks/queries/main/useDeleteNotice';
import { NoticeType, useGetNotices } from '@/hooks/queries/main/useGetNotices';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import type { NoticeProps } from './Notices';

interface NoticeListProps extends NoticeProps {
  setSelectNoticeId: (id: string) => void;
}

export default function NoticeList({
  setActiveComponent,
  setSelectNoticeId,
}: NoticeListProps) {
  const { channelId } = useGetUrlInfo();
  const { data, fetchNextPage, hasNextPage } = useGetNotices(channelId);
  const { mutate: deleteNotice } = useDeleteNotice(channelId);

  return (
    <ul css={NoticeUl}>
      {Array.isArray(data?.pages[0]) &&
        data?.pages.map((notices) => {
          return (
            Array.isArray(notices) &&
            notices.map((notice: NoticeType) => {
              return (
                <div css={LiContainer}>
                  <li
                    key={notice.id}
                    css={NoticeLi}
                    onClick={() => {
                      setSelectNoticeId(notice.id);
                      setActiveComponent('detail');
                    }}
                  >
                    <span css={Noticetitle}>{notice.title}</span>
                    <br />
                    <span css={NoticeUser}>{notice.userName}</span>
                  </li>
                  <button
                    css={DeleteButton}
                    onClick={() => {
                      if (confirm('삭제하시겠습니까?')) deleteNotice(notice.id);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })
          );
        })}
      {hasNextPage ? (
        <button
          css={LoadMoreButton}
          onClick={() => hasNextPage && fetchNextPage()}
        >
          ...
        </button>
      ) : (
        ''
      )}
    </ul>
  );
}

const LiContainer = css`
  display: flex;
  justify-content: space-between;
`;

const NoticeUl = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.5rem;
  height: 11rem;

  overflow: hidden scroll;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 5px solid transparent;
    background-color: #efefef;
    border-radius: 0.5rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const NoticeLi = css`
  display: flex;
  border-bottom: solid 0.1px gray;
  gap: 1rem;
  align-items: center;
  padding: 0.3rem;
  width: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const Noticetitle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeUser = css`
  font-size: 0.7rem;
  color: gray;
  align-self: flex-end;
`;

const LoadMoreButton = css`
  height: 2rem;
  padding: 0.3rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const DeleteButton = css`
  padding: 0.3rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;
