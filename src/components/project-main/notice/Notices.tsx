import { css } from '@emotion/react';
import { lazy, Suspense, useState } from 'react';
import { Header } from './Header';

const NoticeDetail = lazy(() => import('./NoticeDetail'));
const NoticeList = lazy(() => import('./NoticeList'));
const NoticeForm = lazy(() => import('./NoticeForm'));

export interface NoticeProps {
  setActiveComponent: (componentType: ActiveComponentType) => void;
}

export type ActiveComponentType = 'list' | 'form' | 'detail';

export const Notice = () => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentType>('list');
  const [selectNoticeId, setSelectNoticeId] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const changeActiveComponent = (componentType: ActiveComponentType) => {
    setActiveComponent(componentType);
  };

  const changeNoticeFormStatus = (status: boolean) => {
    setIsEdit(status);
  };

  return (
    <section css={Container}>
      <Header
        setActiveComponent={changeActiveComponent}
        changeNoticeFormStatus={changeNoticeFormStatus}
      />
      <Suspense fallback={<>'loading..'</>}>
        {activeComponent === 'list' && (
          <NoticeList
            setActiveComponent={changeActiveComponent}
            setSelectNoticeId={(id: string) => setSelectNoticeId(id)}
          />
        )}
        {activeComponent === 'form' && (
          <NoticeForm
            setActiveComponent={changeActiveComponent}
            selectNoticeId={selectNoticeId}
            isEdit={isEdit}
          />
        )}
        {activeComponent === 'detail' && (
          <NoticeDetail
            setActiveComponent={changeActiveComponent}
            selectNoticeId={selectNoticeId}
            changeNoticeFormStatus={changeNoticeFormStatus}
          />
        )}
      </Suspense>
    </section>
  );
};

const Container = css`
  display: flex;
  height: 20rem;
  width: 25rem;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
  height: fit-content;
  position: relative;

  @media (max-width: 600px) {
    width: 300px;
  }
`;
