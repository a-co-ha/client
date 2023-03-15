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
    mode: 'onChange',
  });
  const { pageTitleField, error, isSubmitting } = usePageTitleForm({
    control: methods.control,
  });
  useEffect(() => {
    setPageName(pageTitle);
    setPageTitleShare(pageTitleField.value);
  }, [pageName, pageTitleField.value]);

  const onSubmit = (data: PageTitle) => {
    //enter 시 put요청
    //setPageName
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <input
            css={styles.pageTitleInput}
            value={pageTitleField.value}
            onChange={pageTitleField.onChange}
            name={pageTitleField.name}
          />
        </form>
      ) : null}
    </div>
  );
};
