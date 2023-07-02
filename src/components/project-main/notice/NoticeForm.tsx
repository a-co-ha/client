import { useGetNotice } from '@/hooks/queries/main/useGetNotice';
import { usePatchNotice } from '@/hooks/queries/main/usePatchNotice';
import { usePostNotice } from '@/hooks/queries/main/usePostNotice';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { NoticeProps } from './Notices';

export interface NoticeFormProps extends NoticeProps {
  selectNoticeId: string;
  isEdit: boolean;
}

export default function NoticeForm({
  setActiveComponent,
  selectNoticeId,
  isEdit,
}: NoticeFormProps) {
  const { channelId } = useGetUrlInfo();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: postNotice } = usePostNotice(channelId);
  const { mutate: editNotice } = usePatchNotice(channelId);
  const { data } = useGetNotice(selectNoticeId, channelId, isEdit);

  useEffect(() => {
    if (data && titleRef.current && contentRef.current && isEdit) {
      titleRef.current.innerText = data.title;
      contentRef.current.innerText = data.content;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contentRef.current || !titleRef.current) return;
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    if (isEdit) {
      editNotice({ selectNoticeId, title, content });
      toast.success('수정되었습니다.', {
        hideProgressBar: true,
      });
    } else {
      postNotice({ title, content });
      toast.success('등록되었습니다.', {
        hideProgressBar: true,
      });
    }

    setActiveComponent('list');
  };

  return (
    <>
      <form onSubmit={handleSubmit} css={NoticeFormContainer}>
        <textarea ref={titleRef} css={NoticeTextareaTitle} />
        <textarea ref={contentRef} css={NoticeTextareaContent} />
        <div css={ButtonContainer}>
          <button type="submit" css={SubmitButton}>
            {isEdit ? '수정하기' : '게시하기'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  '작성중이던 글은 저장되지 않습니다. 목록으로 이동하시겠습니까?'
                )
              )
                setActiveComponent('list');
            }}
            css={CancelButton}
          >
            취소하기
          </button>
        </div>
      </form>
    </>
  );
}

const NoticeFormContainer = css`
  height: 11rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const NoticeTextareaTitle = css`
  border-bottom: solid;
  resize: none;
  &:focus {
    outline: none;
    background: #f6f6f6;
  }
  &:hover {
    background: #f6f6f6;
  }
`;

const NoticeTextareaContent = css`
  resize: none;
  height: 7rem;
  &:focus {
    outline: none;
    background: #f6f6f6;
  }
  &:hover {
    background: #f6f6f6;
  }
`;

const SubmitButton = css`
  border-radius: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background: #3c9ee5;
    color: white;
  }
  border-radius: 0.5rem;
`;

const CancelButton = css`
  border-radius: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background: #f67774;
    color: white;
  }
`;

const ButtonContainer = css`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
