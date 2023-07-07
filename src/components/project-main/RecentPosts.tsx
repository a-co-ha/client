import { useGetRecentPosts } from '@/hooks/queries/main/useGetRecentPosts';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import Link from 'next/link';

export const RecentPosts = () => {
  const { data = [] } = useGetRecentPosts();
  const { channelId } = useGetUrlInfo();

  return (
    <section css={Container}>
      <b css={Title}>
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
        최근 수정된 게시물
      </b>
      <ul>
        {data.map(({ pageName, type, updatedAt, _id }) => {
          return (
            <li key={_id}>
              <Link
                href={`/project/${channelId}/${_id}?name=${pageName}&type=${type}`}
              >
                <p css={Content}>
                  {pageName}
                  <span css={UpdateAtStyle}>{updatedAt}에 수정됨</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const Container = css`
  display: flex;
  height: fit-content;
  width: 15rem;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

export const Title = css`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  gap: 0.3rem;
  padding: 0.5rem;
  align-items: center;
  background: #ffe3e7;
  transition: 0.5s;
  &:hover {
    background: #ffd6dc;
  }
  & svg {
    width: 1.3rem;
  }
`;

const Content = css`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const UpdateAtStyle = css`
  font-size: 0.8rem;
  color: gray;
`;
