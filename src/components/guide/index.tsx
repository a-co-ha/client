import { useRef } from 'react';
import Image from 'next/image';
import acohaImg from '@/images/channelImg/9.png';
import * as styles from './styles';

export const Guide = () => {
  const guideArrow = useRef<HTMLDivElement>(null);

  return (
    <div css={styles.guideBox}>
      <div css={styles.guideArrow}></div>
      <div css={styles.guideImageAlign}>
        <div css={styles.guideImageBox}>
          <Image src={acohaImg} fill alt="guideImg" />
        </div>
        <h1
          css={styles.guideTitle}
        >{`어서오세요!\n아코하에 오신것을 환영합니다🌟`}</h1>
      </div>

      <div css={styles.guideMainBox}>
        <div>
          <div css={styles.guideMainItem}>
            <div css={styles.guideMainTagBox}>
              <span>Post</span>
              <span>Chat</span>
              <span>CommitLog</span>
              <span>Progress</span>
            </div>
            <p>
              아코하는 <b>게시글</b>을 작성하고 <b>실시간 채팅</b>으로 소통하며{' '}
              <b>Github의 커밋 로그</b>와 <b>프로젝트의 진행률</b> 확인 등을 한
              곳에서 편리하게 제공하는{' '}
              <span css={styles.mainItemSpan}>프로젝트 개발 통합 플랫폼</span>
              이에요
            </p>
          </div>
          <div css={styles.guideMainItem}>
            <p>
              여기서 여러분은 손쉽게 프로젝트를 관리하고 협업할 수 있어요.
              게시글 작성으로 아이디어와 문서를 공유하고, 실시간 채팅을 통해
              팀원들과 소통하면서 프로젝트를 원활히 진행할 수 있답니다. 또한
              Github의 커밋 로그와 프로젝트 진행률을 한 눈에 확인해 팀의 성과와
              발전을 추적할 수 있어요.
            </p>
          </div>
          <div css={styles.guideMainItem}>
            <p css={styles.mainItemDesc}>
              아코하는{' '}
              <span css={styles.mainItemDescSpan}>
                직관적이고 사용자 친화적인 인터페이스
              </span>
              를 제공해서 보다 쉽고, 편리하게 프로젝트를 관리할 수 있도록
              도와줘요. 또한 모든 기능은 한 곳에서 통합되어 있어,{' '}
              <span css={styles.mainItemDescSpan}>시간과 노력을 절약</span>할 수
              있어요!
            </p>
          </div>
          <div css={styles.guideMainItem}>
            <p>
              함께 프로젝트를 성공적으로 이끌어나갈 동료들과의 협업을 위해 지금
              바로 참여 해보세요! 아코하가 프로젝트의 생산성과 성공을
              지원할거에요! 함께하는 모든 순간을 즐거움과 성취감으로 가득
              채워나가봅시다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
