import { css } from '@emotion/react';
import { lazy, Suspense, useState } from 'react';
import { Header } from './Header';
const NoticeList = lazy(() => import('./NoticeList'));
const NoticeForm = lazy(() => import('./NoticeForm'));
const NoticeDetail = lazy(() => import('./NoticeDetail'));

export interface NoticeProps {
  setActiveComponent: (componentType: ActiveComponentType) => void;
}

export type ActiveComponentType = 'list' | 'form' | 'detail';

export const Notice = () => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentType>('list');
  const [selectNoticeId, setSelectNoticeId] = useState('');

  const changeActiveComponent = (componentType: ActiveComponentType) => {
    setActiveComponent(componentType);
  };

  return (
    <section css={Container}>
      <Header setActiveComponent={changeActiveComponent} />
      <Suspense fallback={`로딩중...`}>
        {activeComponent === 'list' && (
          <NoticeList
            setActiveComponent={changeActiveComponent}
            setSelectNoticeId={(id: string) => setSelectNoticeId(id)}
          />
        )}
        {activeComponent === 'form' && (
          <NoticeForm setActiveComponent={changeActiveComponent} />
        )}
        {activeComponent === 'detail' && (
          <NoticeDetail
            setActiveComponent={changeActiveComponent}
            selectNoticeId={selectNoticeId}
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
`;
