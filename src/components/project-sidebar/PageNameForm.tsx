import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { useForm } from 'react-hook-form';
import { PageName } from './types/index';
import { usePageNameForm } from '../../hooks/usePageNameForm';
import { toast } from 'react-toastify';
import * as styles from './styles';

export const PageNameForm = ({
  pageId,
  pageName,
}: {
  pageId: string;
  pageName: string;
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
