import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { useForm } from 'react-hook-form';
import { usePageNameForm } from '../../hooks/usePageNameForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as styles from './styles';
import type { PageName } from './types';

export const PageNameForm = ({
  pageId,
  pageName,
  channelId,
}: {
  pageId: string;
  pageName: string;
  channelId: string | string[] | undefined;
}) => {
  const [isEditing, setIsEditing] = useRecoilState(pageNameEditToggle(pageId));
  const setPageNameShare = useSetRecoilState(pageNameShare(pageId));

  const methods = useForm<PageName>({
    defaultValues: { pageName },
    mode: 'onSubmit',
  });
  const { pageNameField, errors } = usePageNameForm({
    control: methods.control,
  });
  useEffect(() => {
    setPageNameShare(pageNameField.value);
  }, [pageNameField.value]);

  const onSubmit = async (data: PageName) => {
    try {
      console.log(data);
      await axios.put(`/api/page/${pageId}?channel=${channelId}`, {
        pageName: data.pageName,
      });
      toast.success('페이지 이름을 바꿨어요');
      setIsEditing(false);
    } catch (error) {
      toast.error('에러가 발생했어요');
    }
  };

  const onError = () => {
    toast.error(errors.pageName?.message);
  };
  return (
    <div>
      {isEditing ? (
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <input
            css={styles.pageNameInput}
            value={pageNameField.value}
            onChange={pageNameField.onChange}
            name={pageNameField.name}
            autoFocus
          />
        </form>
      ) : null}
      {/* {error ? error.message : null} */}
    </div>
  );
};
