import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import {
  pageTitleState,
  pageTitleEditToggle,
  pageTitleShare,
} from '@/recoil/project/atom';
import { useForm } from 'react-hook-form';
import { PageTitle } from './types/index';
import { usePageTitleForm } from '../../hooks/usePageTitleForm';
import { toast } from 'react-toastify';
import * as styles from './styles';

export const PageTitleForm = ({
  pageId,
  pageTitle,
}: {
  pageId: string;
  pageTitle: string;
}) => {
  const [isEditing, setIsEditing] = useRecoilState(pageTitleEditToggle(pageId));
  const [pageName, setPageName] = useRecoilState(pageTitleState(pageId));
  const setPageTitleShare = useSetRecoilState(pageTitleShare(pageId));

  const methods = useForm<PageTitle>({
    defaultValues: { pageTitle: pageTitle },
    mode: 'onSubmit',
  });
  const { pageTitleField, errors } = usePageTitleForm({
    control: methods.control,
  });
  useEffect(() => {
    setPageName(pageTitle);
    setPageTitleShare(pageTitleField.value);
  }, [pageName, pageTitleField.value]);

  const onSubmit = async (data: PageTitle) => {
    try {
      console.log(data);
      toast.success('페이지 이름을 바꿨어요');
      setIsEditing(false);
    } catch (error) {
      toast.error('에러가 발생했어요');
    }
  };

  const onError = () => {
    toast.error(errors.pageTitle?.message);
  };
  return (
    <div>
      {isEditing ? (
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <input
            css={styles.pageTitleInput}
            value={pageTitleField.value}
            onChange={pageTitleField.onChange}
            name={pageTitleField.name}
            autoFocus
          />
        </form>
      ) : null}
      {/* {error ? error.message : null} */}
    </div>
  );
};
