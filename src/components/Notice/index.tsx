import { useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@/images/close.svg';
import * as styles from './styles';
import type { NoticeStatus } from './types';

export const Notice = ({ status }: NoticeStatus) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {isOpen && (
        <div css={styles.noticeBox}>
          {status === 'ERROR' ? (
            <div>에러가 발생했어요. 새로고침 해보세요.</div>
          ) : null}
          {status === 'SUCCESS' ? (
            <div>
              화녕합니다.
              <br />
              무사히 초기페이지에 진입하셨군요.
            </div>
          ) : null}
          <span role="button" tabIndex={0} onClick={() => setIsOpen(false)}>
            <Image src={CloseIcon} alt="close icon" />
          </span>
        </div>
      )}
    </>
  );
};
