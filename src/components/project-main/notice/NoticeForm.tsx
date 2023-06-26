import { usePostNotice } from '@/hooks/queries/main/usePostNotice';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import type { NoticeProps } from './Notice';

export default function NoticeForm({ setActiveComponent }: NoticeProps) {
  const { channelId } = useGetUrlInfo();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: postNotice } = usePostNotice(channelId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contentRef.current || !titleRef.current) return;
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    postNotice({ channelId, title, content });
    titleRef.current.value = '';
    contentRef.current.value = '';
    toast.success('등록되었습니다.', {
      hideProgressBar: true,
    });
    setActiveComponent('list');
  };

  return (
    <>
      <form onSubmit={handleSubmit} css={NoticeFormContainer}>
        <textarea ref={titleRef} css={NoticeTextarea} />
        <textarea ref={contentRef} css={NoticeTextarea} />
        <button css={PostButton}>게시하기</button>
      </form>
      <button onClick={() => setActiveComponent('list')}>취소하기</button>
    </>
  );
}

const NoticeFormContainer = css`
  border: solid;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const NoticeTextarea = css`
  border: solid;
`;

const PostButton = css`
  border: solid;
`;
