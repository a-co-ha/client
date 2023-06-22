import { useGetRecentPosts } from '@/hooks/queries/main/useGetRecentPosts';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import Link from 'next/link';

export const RecentPosts = () => {
  const { data = [] } = useGetRecentPosts();
  const { channelId } = useGetUrlInfo();

  return (
    <section css={Container}>
      <h2>✨최근 수정된 게시물</h2>
      <ul>
        {data.map(({ pageName, type, updatedAt, _id }) => {
          return (
            <li key={_id}>
              <Link
                href={`/project/${channelId}/${_id}?name=${pageName}&type=${type}`}
              >
                <p css={Content}>
                  {pageName}
                  <br />
                  {updatedAt}에 마지막으로 수정됨
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Container = css`
  display: flex;
  border: solid;
  height: 20rem;
  width: 30rem;
  padding: 1rem;
  flex-direction: column;
`;

const Content = css`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 8px 10px 6px 6px;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 3.5rem;
`;
