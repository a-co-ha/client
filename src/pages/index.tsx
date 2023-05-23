import { Loading } from '@/components/loading/Loading';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { throttle } from 'lodash';
import * as styles from '../styles/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IconOne } from '../components/project-sidebar/Icons';
import Image from 'next/image';
import commitLog from '@/images/landingPage/commitLog.png';
import chat from '@/images/landingPage/chat.svg';

const IndexPage = () => {
  const IntroSection = useRef<any>(null);
  const messageBox = useRef<HTMLDivElement>(null);
  const subMessage = useRef<HTMLDivElement>(null);
  const messageA = useRef<HTMLDivElement>(null);
  const messageB = useRef<HTMLDivElement>(null);
  const messageC = useRef<HTMLDivElement>(null);
  const messageD = useRef<HTMLDivElement>(null);
  const messageBackground = useRef<HTMLDivElement>(null);
  const introMonitorBox = useRef<HTMLDivElement>(null);
  const introChatImgBox = useRef<HTMLDivElement>(null);
  const introChatImg = useRef<HTMLImageElement>(null);
  const introChatReplyBox = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clickItem, setClickItem] = useState('');
  console.log(`위messageA`, messageA);
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  useEffect(() => {
    // AOS.init();
  }, []);

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (!messageA.current) return;
        scrollLoop();
        // console.log(`scrollLoop`);
      }, 30),
    []
  );
  useLayoutEffect(() => {
    window.addEventListener(`load`, () => {
      setIsLoading(false);
    });
  }, [isLoading]);
  useLayoutEffect(() => {
    const div = document.getElementById(`__next`);
    if (div !== null) {
      div.style.overflow = `visible`;
    }
    setLayout();
    scrollLoop();

    console.log('12');
  }, []);

  useLayoutEffect(() => {
    window.addEventListener(`scroll`, throttledScroll);
    // console.log(`scroll`);
    return () => {
      window.addEventListener(`scroll`, throttledScroll);
    };
  }, [throttledScroll]);

  const introClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const targetValue = target.firstElementChild?.textContent;
    if (targetValue !== undefined && targetValue !== null) {
      console.log(`targetValue`, targetValue === '기록');
      targetValue === clickItem ? setClickItem('') : setClickItem(targetValue);
    }
    console.log(`girok`, clickItem === '기록');
    console.log(`targetValue`, targetValue);
  };

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: IntroSection,
        messageBox: messageBox,
        subMessage: subMessage,
        messageA: messageA,
        messageB: messageB,
        messageC: messageC,
        messageD: messageD,
        messageBackground: messageBackground,
        introMonitorBox: introMonitorBox,
        introChatImgBox: introChatImgBox,
        introChatImg: introChatImg,
        introChatReplyBox: introChatReplyBox,
      },
      values: {
        messageBox_colorR_in: [255, 0, { start: 0.05, end: 0.3 }],
        messageBox_colorG_in: [150, 0, { start: 0.05, end: 0.3 }],
        messageBox_colorB_in: [166, 0, { start: 0.05, end: 0.3 }],
        messageBox_translateX_in: [0, 35, { start: 0.05, end: 0.6 }],
        messageB_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageC_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageD_translateX_in: [-80, 0, { start: 0.05, end: 0.3 }],
        introChatImg_translateX_in: [0, -40, { start: 0.22, end: 0.6 }],
        messageBackground_translateY_in: [100, 0, { start: 0.2, end: 0.3 }],
        messageBox_translateY_in: [-50, 160, { start: 0.4, end: 0.6 }],
        messageA_translateY_in: [0, -40, { start: 0.4, end: 0.6 }],
        messageB_translateY_in: [0, -40, { start: 0.4, end: 0.6 }],
        messageC_translateY_in: [0, -40, { start: 0.4, end: 0.6 }],
        messageD_translateY_in: [0, -40, { start: 0.4, end: 0.6 }],
        introChatImgBox_translateY_in: [50, 15, { start: 0.22, end: 0.4 }],
        introChatImg_translateY_in: [25, -20, { start: 0.22, end: 0.6 }],
        introChatReplyBox_translateY_in: [25, 0, { start: 0.65, end: 0.75 }],
        // introMonitorBox_translateY_in: [-50, -100, { start: 0.05, end: 0.3 }],
        // messageB_translateX_out: [0, -100, { start: 0.05, end: 0.3 }],
        // messageC_translateX_out: [0, -100, { start: 0.05, end: 0.3 }],
        // messageD_translateX_out: [0, -80, { start: 0.05, end: 0.3 }],
        messageA_translateY_out: [-40, 0, { start: 0.7, end: 0.9 }],
        messageB_translateY_out: [-40, 0, { start: 0.7, end: 0.9 }],
        messageC_translateY_out: [-40, 0, { start: 0.7, end: 0.9 }],
        messageD_translateY_out: [-40, 0, { start: 0.7, end: 0.9 }],
        subMessage_opacity_in: [1, 0, { start: 0.05, end: 0.15 }],
        messageBackground_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        messageD_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        introMonitorBox_opacity_out: [1, 0, { start: 0.05, end: 0.2 }],
        messageB_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
        messageD_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
        introChatImgBox_opacity_in: [0, 1, { start: 0.22, end: 0.3 }],
        introChatReplyBox_opacity_in: [0, 1, { start: 0.65, end: 0.75 }],
        // introChatImgBox_opacity_out: [1, 0, { start: 0.05, end: 0.2 }],
        messageBox_scale_in: [1, 0.7, { start: 0.4, end: 0.6 }],
        introChatImg_width_in: [150, 250, { start: 0.42, end: 0.6 }],
      },
    },
  ];

  const setLayout = useCallback(() => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }
      if (sceneInfo[i].objs.container) {
        sceneInfo[i].objs.container.current.style.height = `${
          sceneInfo[i].scrollHeight + window.innerHeight
        }px`;
      }
    }
    // yOffset = window.pageYOffset;
    // console.log(`여기 y`, yOffset);
    // let totalScrollHeight = 0;
    // for (let i = 0; i < sceneInfo.length; i++) {
    //   totalScrollHeight += sceneInfo[i].scrollHeight;
    //   if (totalScrollHeight >= yOffset) {
    //     currentScene = i;
    //     console.log(`currentScene`, currentScene);
    //     break;
    //   }
    // }
    console.log('setLayout');
  }, []);

  const calcValues = useCallback((values: any, currentYOffset: number) => {
    let rv;

    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      console.log(`cY`, currentYOffset);
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
    }
    return rv;
  }, []);

  const playAnimation = async () => {
    const objs = sceneInfo[currentScene].objs;
    console.log(`objs`, objs);
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        // 	objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        if (
          objs.messageBox.current &&
          objs.subMessage.current &&
          objs.messageBackground.current &&
          objs.messageA.current &&
          objs.messageB.current &&
          objs.messageC.current &&
          objs.messageD.current &&
          objs.introMonitorBox.current &&
          objs.introChatImgBox.current &&
          objs.introChatImg.current &&
          objs.introChatReplyBox.current
        ) {
          console.log(`scroll`, scrollRatio);
          if (scrollRatio <= 0.62) {
            objs.messageBox.current.style.transform = `translate3d(${calcValues(
              values.messageBox_translateX_in,
              currentYOffset
            )}%,${calcValues(
              values.messageBox_translateY_in,
              currentYOffset
            )}%,0) scale(${calcValues(
              values.messageBox_scale_in,
              currentYOffset
            )})`;
            objs.messageBox.current.style.color = `rgba(${calcValues(
              values.messageBox_colorR_in,
              currentYOffset
            )},${calcValues(
              values.messageBox_colorG_in,
              currentYOffset
            )},${calcValues(values.messageBox_colorB_in, currentYOffset)},1)`;
            objs.subMessage.current.style.opacity = `${calcValues(
              values.subMessage_opacity_in,
              currentYOffset
            )}`;
            objs.messageBackground.current.style.transform = `translate3d(0,${calcValues(
              values.messageBackground_translateY_in,
              currentYOffset
            )}%, 0)`;
            objs.messageBackground.current.style.opacity = `${calcValues(
              values.messageBackground_opacity_in,
              currentYOffset
            )}`;
            objs.introMonitorBox.current.style.userSelect = `auto`;
            objs.introMonitorBox.current.style.opacity = `${calcValues(
              values.introMonitorBox_opacity_out,
              currentYOffset
            )}`;
            objs.messageA.current.style.transform = `translate3d(0, 0, 0)`;
            objs.messageB.current.style.transform = `translate3d(${calcValues(
              values.messageB_translateX_in,
              currentYOffset
            )}%,0, 0)`;
            objs.messageB.current.style.opacity = `${calcValues(
              values.messageB_opacity_in,
              currentYOffset
            )}`;
            objs.messageC.current.style.transform = `translate3d(${calcValues(
              values.messageC_translateX_in,
              currentYOffset
            )}%, 0, 0)`;
            objs.messageD.current.style.transform = `translate3d(${calcValues(
              values.messageD_translateX_in,
              currentYOffset
            )}%, 0, 0)`;
            objs.messageD.current.style.opacity = `${calcValues(
              values.messageD_opacity_in,
              currentYOffset
            )}`;
            if (scrollRatio >= 0.22) {
              objs.introChatImgBox.current.style.display = `block`;
            } else {
              objs.introChatImgBox.current.style.display = `none`;
            }
            objs.introChatImgBox.current.style.transform = `translate3d(0,${calcValues(
              values.introChatImgBox_translateY_in,
              currentYOffset
            )}%,0)`;
            objs.introChatImgBox.current.style.opacity = `${calcValues(
              values.introChatImgBox_opacity_in,
              currentYOffset
            )}`;
            objs.introChatImg.current.style.transform = `translate3d(${calcValues(
              values.introChatImg_translateX_in,
              currentYOffset
            )}%,${calcValues(
              values.introChatImg_translateY_in,
              currentYOffset
            )}%,0)`;
            objs.introChatImg.current.style.width = `${calcValues(
              values.introChatImg_width_in,
              currentYOffset
            )}%`;

            // objs.introMonitorBox.current.style.transform = `translate3d(0,${calcValues(
            //   values.introMonitorBox_translateY_in,
            //   currentYOffset
            // )}%, 0)`;
            // in
          } else if (scrollRatio >= 0.22) {
            objs.introMonitorBox.current.style.userSelect = `none`;
          }
          if (scrollRatio <= 0.77) {
            objs.introChatReplyBox.current.style.transform = `translate3d(0,${calcValues(
              values.introChatReplyBox_translateY_in,
              currentYOffset
            )}%,0)`;
            objs.introChatReplyBox.current.style.opacity = `${calcValues(
              values.introChatReplyBox_opacity_in,
              currentYOffset
            )}`;
          }
        }
        // 	if (scrollRatio <= 0.42) {
        // 		// in
        // 		objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
        // 		objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        // 	} else {
        // 		// out
        // 		objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
        // 		objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        // 	}

        break;
    }
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    yOffset = window.pageYOffset;
    console.log(`여기 y`, yOffset);
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        console.log(`currentScene`, currentScene);
        break;
      }
    }

    playAnimation();
  };

  const aos = {
    'data-aos': `fade-up`,
    'data-aos-offset': '0',
    // 'data-aos-delay': '50',
    'data-aos-duration': '800',
    // 'data-aos-easing': 'ease-in-out',
    // 'data-aos-mirror': 'true',
    'data-aos-once': 'true',
    'data-aos-anchor-placement': 'top-center',
  };
  return (
    <div css={styles.flexRowCenter}>
      {isLoading ? (
        <section ref={IntroSection} css={styles.mainTitleSection}>
          <div css={styles.mainTitleBox}>
            <div css={styles.mainTitleDesc}>
              <h1 ref={subMessage}>프로젝트의 시작과 끝,</h1>
            </div>
            <div ref={messageBox} css={styles.messageBox}>
              <div ref={messageA} css={styles.messages}>
                아코
              </div>
              <div ref={messageB} css={styles.messages}>
                딩
              </div>
              <div ref={messageC} css={styles.messages}>
                하
              </div>
              <div ref={messageD} css={styles.messages}>
                고싶다
              </div>
              <div ref={messageBackground} css={styles.messageBackground}></div>
            </div>
            <div ref={introMonitorBox}>
              <div css={styles.introMonitorBox}>
                <div
                  css={styles.introMonitorItem(clickItem === `기록`, clickItem)}
                  onClick={introClickHandler}
                >
                  <div css={styles.introMonitorItemSvgBox}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      css={styles.introMonitorItemSvg}
                    />
                    기록
                  </div>
                  <div
                    css={styles.introMonitorItemSvgText(clickItem === `기록`)}
                  >{`프로젝트의 아이디어 공유나\n 희의록을 공유할 수 있어요`}</div>
                </div>
                <div
                  css={styles.introMonitorItem(clickItem === `채팅`, clickItem)}
                  onClick={introClickHandler}
                >
                  <div css={styles.introMonitorItemSvgBox}>
                    <FontAwesomeIcon
                      icon={faComments}
                      css={styles.introMonitorItemSvg}
                    />
                    채팅
                  </div>
                  <div
                    css={styles.introMonitorItemSvgText(clickItem === `채팅`)}
                  >{`팀원들과 실시간 채팅으로 소통할 수 있어요`}</div>
                </div>
                <div
                  css={styles.introMonitorItem(
                    clickItem === `커밋로그`,
                    clickItem
                  )}
                  onClick={introClickHandler}
                >
                  <div css={styles.introMonitorItemSvgBox}>
                    <FontAwesomeIcon
                      icon={faGithub}
                      css={styles.introMonitorItemSvg}
                    />
                    커밋로그
                  </div>
                  <div
                    css={styles.introMonitorItemSvgText(
                      clickItem === `커밋로그`
                    )}
                  >{`프로젝트를 깃허브 저장소와 연결해서\n 커밋로그 및 이슈를 확인할 수 있어요`}</div>
                </div>
                <div
                  css={styles.introMonitorItem(
                    clickItem === `진행상황`,
                    clickItem
                  )}
                  onClick={introClickHandler}
                >
                  <div css={styles.introMonitorItemSvgBox}>
                    <FontAwesomeIcon
                      icon={faListCheck}
                      css={styles.introMonitorItemSvg}
                    />
                    진행상황
                  </div>
                  <div
                    css={styles.introMonitorItemSvgText(
                      clickItem === `진행상황`
                    )}
                  >{`체크리스트를 만들어 진행상황을 %로 확인할 수 있어요`}</div>
                </div>
                <div css={styles.arrowDownSvg}></div>
              </div>
            </div>
            <div ref={introChatImgBox} css={styles.introChatBox}>
              <div css={styles.introChatBox}>
                <div css={styles.introChatImgBox}>
                  <Image
                    ref={introChatImg}
                    css={styles.introChatImg}
                    src={chat}
                    width={300}
                    height={200}
                    alt={`intro chat img`}
                  />
                  <div
                    ref={introChatReplyBox}
                    css={styles.introChatImgReplyBox}
                  >
                    <div>{`팀원을 초대하고\n프로젝트를 시작해 볼까요?`}</div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loading position="fixed" />
      )}
    </div>
  );
};

export default IndexPage;
