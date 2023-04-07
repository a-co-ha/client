import { useRecoilState, useSetRecoilState } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePageNameForm } from '../../hooks/usePageNameForm';
import { useMutation } from '@tanstack/react-query';
import { usePutEditablePage } from '@/hooks/queries/editable/putPage';
import { api } from '@/pages/api/config/api-config';
import { toast } from 'react-toastify';
import * as styles from './styles';
import type { PageName } from './type';

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
  console.log(`채널 아이디입니다`, channelId);
  const putPageName = usePutEditablePage(channelId, pageId);

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
      console.log(pageName);
      putPageName.mutate(data.pageName);
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
          <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900">
            <input
              css={styles.pageNameInput}
              value={pageNameField.value}
              onChange={pageNameField.onChange}
              name={pageNameField.name}
              autoFocus
            />
          </div>
        </form>
      ) : null}
    </div>
  );
};
