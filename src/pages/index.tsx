import { Loading } from '@/components/loading/Loading';
import React from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { divide, throttle } from 'lodash';
import * as styles from '../styles/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IconOne } from '../components/project-sidebar/Icons';
import commitLog from '@/images/landingPage/commitLog.png';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import chat from '@/images/landingPage/chat.svg';
import Image from 'next/image';
import previewRed from '@/images/channelImg/1.png';
import previewGreen from '@/images/channelImg/6.png';
import previewPurple from '@/images/channelImg/7.png';
import previewGithub from '@/images/githubLogo.png';
import {
  ChevronDownIcon,
  BellAlertIcon,
  DocumentIcon,
  ListBulletIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import editableA from '@/images/landingPage/editableA.png';
import editableB from '@/images/landingPage/editableB.png';

const IndexPage = () => {
  //introSection
  const introSection = useRef<any>(null);
  const introSectionBox = useRef<HTMLDivElement>(null);
  const messageBox = useRef<HTMLDivElement>(null);
  const subMessage = useRef<HTMLDivElement>(null);
  const messageA = useRef<HTMLDivElement>(null);
  const messageB = useRef<HTMLDivElement>(null);
  const messageC = useRef<HTMLDivElement>(null);
  const messageD = useRef<HTMLDivElement>(null);
  const messageBackground = useRef<HTMLDivElement>(null);
  const introMonitorBox = useRef<HTMLDivElement>(null);
  const introMonitorItemA = useRef<HTMLDivElement>(null);
  const introMonitorItemB = useRef<HTMLDivElement>(null);
  const introMonitorItemC = useRef<HTMLDivElement>(null);
  const introMonitorItemD = useRef<HTMLDivElement>(null);
  const introChatImgBox = useRef<HTMLDivElement>(null);
  const introChatImg = useRef<HTMLImageElement>(null);
  const introChatReplyBox = useRef<HTMLDivElement>(null);
  const introArrowDown = useRef<HTMLDivElement>(null);
  //mainItemSectionA
  const mainItemSectionA = useRef<any>(null);
  const mainItemSectionABox = useRef<HTMLDivElement>(null);
  const mainItemPreviewTitle = useRef<HTMLDivElement>(null);
  const mainItemPreview = useRef<HTMLDivElement>(null);
  const mainItemPreviewScrollItemBox = useRef<HTMLDivElement>(null);
  const mainItemPreviewScrollBoxTitle = useRef<HTMLHeadingElement>(null);
  const mainItemEditableTitle = useRef<HTMLHeadingElement>(null);
  const mainItemEditableSubTitle = useRef<HTMLHeadingElement>(null);
  const mainItemEditableDescBox = useRef<HTMLDivElement>(null);
  const mainItemEditableA = useRef<HTMLDivElement>(null);
  const mainItemEditableB = useRef<HTMLDivElement>(null);
  const mainItemChatTitle = useRef<HTMLHeadingElement>(null);
  const mainItemChatSubTitle = useRef<HTMLHeadingElement>(null);
  const mainItemChatDescBox = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [clickItem, setClickItem] = useState('');
  const [clickLabel, setClickLabel] = useState('');
  const [isAni, setIsAni] = useState(false);
  console.log(`위messageA`, messageA);
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  let scrollToCount = 1;

  useEffect(() => {
    AOS.init();
  }, []);

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (!messageA.current) return;
        yOffset = window.pageYOffset;
        scrollLoop();
        // console.log(`scrollLoop`);
      }, 30),
    [yOffset]
  );
  useLayoutEffect(() => {
    window.addEventListener(`load`, () => {
      setLayout();
      scrollLoop();
    });
  }, []);
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
      targetValue === clickItem ? setClickItem('') : setClickItem(targetValue);
    }
  };

  const previewClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement | HTMLSpanElement;
    const targetLabel = target.ariaLabel;
    if (targetLabel !== undefined && targetLabel !== null) {
      if (targetLabel === clickLabel) {
        setClickLabel('');
      } else {
        setClickLabel(targetLabel);
      }
      console.log(targetLabel);
    }
  };

  const arrowClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const targetLabel = target.ariaLabel;
    const scrollBox = mainItemPreviewScrollItemBox.current as HTMLDivElement;
    if (targetLabel === `ArrowLeft` && scrollBox) {
      scrollToCount--;
      scrollBox.scrollTo({
        left: scrollBox.offsetWidth * scrollToCount,
        behavior: 'smooth',
      });
      if (scrollToCount === 0) {
        scrollToCount = 7;
      }
      console.log(`left`, scrollBox.offsetWidth);
      console.log(`scCount`, scrollToCount);
    } else if (targetLabel === `ArrowRight` && scrollBox) {
      scrollToCount++;
      scrollBox.scrollTo({
        left: scrollBox.offsetWidth * scrollToCount,
        behavior: 'smooth',
      });
      if (scrollToCount === 7) {
        scrollToCount = 1;
      }
      console.log(`scCount`, scrollToCount);
    }
  };

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 4, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: introSection,
        content: introSectionBox,
        messageBox: messageBox,
        subMessage: subMessage,
        messageA: messageA,
        messageB: messageB,
        messageC: messageC,
        messageD: messageD,
        messageBackground: messageBackground,
        introMonitorBox: introMonitorBox,
        introMonitorItemA: introMonitorItemA,
        introMonitorItemB: introMonitorItemB,
        introMonitorItemC: introMonitorItemC,
        introMonitorItemD: introMonitorItemD,
        introChatImgBox: introChatImgBox,
        introChatImg: introChatImg,
        introChatReplyBox: introChatReplyBox,
        introArrowDown: introArrowDown,
      },
      values: {
        messageBox_colorR_in: [255, 0, { start: 0.05, end: 0.3 }],
        messageBox_colorG_in: [150, 0, { start: 0.05, end: 0.3 }],
        messageBox_colorB_in: [166, 0, { start: 0.05, end: 0.3 }],
        messageBox_translateX_in: [0, 40, { start: 0.05, end: 0.75 }],
        messageB_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageC_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageD_translateX_in: [-80, 0, { start: 0.05, end: 0.3 }],
        introChatImg_translateX_in: [0, -40, { start: 0.22, end: 0.75 }],
        messageBackground_translateY_in: [100, 0, { start: 0.2, end: 0.3 }],
        messageBox_translateY_in: [-50, 160, { start: 0.4, end: 0.75 }],
        messageA_translateY_in: [0, -40, { start: 0.4, end: 0.75 }],
        messageB_translateY_in: [0, -40, { start: 0.4, end: 0.75 }],
        messageC_translateY_in: [0, -40, { start: 0.4, end: 0.75 }],
        messageD_translateY_in: [0, -40, { start: 0.4, end: 0.75 }],
        introChatImgBox_translateY_in: [50, 15, { start: 0.22, end: 0.4 }],
        introChatImg_translateY_in: [25, -20, { start: 0.22, end: 0.75 }],
        introChatReplyBox_translateY_in: [25, 0, { start: 0.8, end: 0.85 }],
        subMessage_opacity_in: [1, 0, { start: 0.05, end: 0.15 }],
        messageBackground_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        messageD_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        introMonitorBox_opacity_out: [1, 0, { start: 0.05, end: 0.2 }],
        messageB_opacity_out: [1, 0, { start: 0.4, end: 0.75 }],
        messageD_opacity_out: [1, 0, { start: 0.4, end: 0.75 }],
        introChatImgBox_opacity_in: [0, 1, { start: 0.22, end: 0.3 }],
        introChatReplyBox_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        introArrowDown_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        messageBox_scale_in: [1, 0.7, { start: 0.4, end: 0.85 }],
        introChatImg_width_in: [150, 250, { start: 0.42, end: 0.85 }],
      },
    },
    {
      type: 'normal',
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: mainItemSectionA,
        content: mainItemSectionABox,
        mainItemPreviewTitle: mainItemPreviewTitle,
        mainItemPreview: mainItemPreview,
        mainItemPreviewScrollBoxTitle: mainItemPreviewScrollBoxTitle,
        mainItemEditableTitle: mainItemEditableTitle,
        mainItemEditableSubTitle: mainItemEditableSubTitle,
        mainItemEditableDescBox: mainItemEditableDescBox,
        mainItemEditableA: mainItemEditableA,
        mainItemEditableB: mainItemEditableB,
        mainItemChatTitle: mainItemChatTitle,
        mainItemChatSubTitle: mainItemChatSubTitle,
        mainItemChatDescBox: mainItemChatDescBox,
      },
      values: {
        // mainItemPreviewTitle_translateY_in: [25, 0, { start: 0, end: 0.01 }],
        // mainItemPreview_translateY_in: [25, 0, { start: 0.05, end: 0.05 }],
        // mainItemPreviewTitle_opacity_in: [0, 1, { start: 0, end: 0.01 }],
        // mainItemPreview_opacity_in: [0, 1, { start: 0.05, end: 0.3 }],
      },
    },
  ];

  const setLayout = useCallback(() => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky' || sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }

      if (sceneInfo[i].objs.container) {
        sceneInfo[i].objs.container.current.style.height = `${
          sceneInfo[i].scrollHeight + window.innerHeight
        }px`;
      }
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        console.log(`currentScene`, currentScene);
        break;
      }
    }
    console.log('setLayout');
  }, []);

  const calcValues = useCallback((values: any, currentYOffset: number) => {
    let rv;

    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = Number((currentYOffset / scrollHeight).toFixed(6));
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
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }, []);

  const playAnimation = useCallback(() => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = Number((currentYOffset / scrollHeight).toFixed(6));

    switch (currentScene) {
      case 0:
        if (
          objs.content.current &&
          objs.messageBox?.current &&
          objs.subMessage.current &&
          objs.messageBackground.current &&
          objs.messageA.current &&
          objs.messageB.current &&
          objs.messageC.current &&
          objs.messageD.current &&
          objs.introMonitorBox.current &&
          objs.introMonitorItemA.current &&
          objs.introMonitorItemB.current &&
          objs.introMonitorItemC.current &&
          objs.introMonitorItemD.current &&
          objs.introChatImgBox.current &&
          objs.introChatImg.current &&
          objs.introChatReplyBox.current &&
          objs.introArrowDown.current
        ) {
          console.log(`scroll`, scrollRatio);
          if (scrollRatio <= 0.77) {
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

            objs.introMonitorBox.current.style.opacity = `${calcValues(
              values.introMonitorBox_opacity_out,
              currentYOffset
            )}`;
            if (scrollRatio >= 0.22) {
              objs.introChatImgBox.current.style.display = `flex`;
              objs.introMonitorBox.current.style.cursor = `unset`;
            } else {
              objs.introMonitorBox.current.style.cursor = `pointer`;
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
          }
          if (scrollRatio <= 0.92) {
            objs.introChatReplyBox.current.style.transform = `translate3d(0,${calcValues(
              values.introChatReplyBox_translateY_in,
              currentYOffset
            )}%,0)`;
            objs.introChatReplyBox.current.style.opacity = `${calcValues(
              values.introChatReplyBox_opacity_in,
              currentYOffset
            )}`;
            objs.introArrowDown.current.style.opacity = `${calcValues(
              values.introArrowDown_opacity_in,
              currentYOffset
            )}`;
          }
          if (scrollRatio >= 0.95) {
            console.log(
              `scrollbar`,
              window.innerWidth - document.body.clientWidth
            );
            objs.content.current.style.position = `static`;
            objs.content.current.style.marginTop = `${scrollHeight * 0.805}px`;
            if (window.innerWidth < 361) {
              objs.content.current.style.transform = `translate3d(0,-50%,0)`;
              objs.content.current.style.width = `${window.innerWidth * 0.7}px`;
            } else {
              objs.content.current.style.transform = `translate3d(-7.5px,-50%,0)`;
              objs.content.current.style.width = `${
                window.innerWidth * 0.55 - 7.5
              }px`;
            }
          } else {
            objs.content.current.style.position = `fixed`;
            objs.content.current.style.marginTop = `0`;
            objs.content.current.style.transform = `translate3d(-50%,-50%,0)`;
            if (window.innerWidth < 361) {
              objs.content.current.style.width = `${window.innerWidth * 0.7}px`;
            } else {
              objs.content.current.style.width = `${
                window.innerWidth * 0.55 - 7.5
              }px`;
            }
          }
        }
        break;
      case 1:
        if (
          objs.mainItemPreviewTitle?.current &&
          objs.mainItemPreview.current &&
          objs.mainItemPreviewScrollBoxTitle.current &&
          objs.mainItemEditableTitle.current &&
          objs.mainItemEditableSubTitle.current &&
          objs.mainItemEditableDescBox.current &&
          objs.mainItemEditableA.current &&
          objs.mainItemEditableB.current
        ) {
          console.log(`scene2`, scrollRatio);
          if (scrollRatio > 0.03) {
            objs.mainItemPreviewTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemPreviewScrollBoxTitle.current.style.transform = `translate3d(0,0,0)`;
            if (window.innerWidth < 520) {
              objs.mainItemPreview.current.style.transform = `translate3d(17%,30%,0)`;
            } else if (window.innerWidth < 361) {
              objs.mainItemPreview.current.style.transform = `translate3d(20%,30%,0)`;
            } else {
              objs.mainItemPreview.current.style.transform = `translate3d(0,30%,0)`;
            }
            objs.mainItemPreviewTitle.current.style.opacity = `1`;
            objs.mainItemPreviewScrollBoxTitle.current.style.opacity = `1`;
            objs.mainItemPreview.current.style.opacity = `1`;
          } else {
            objs.mainItemPreviewTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemPreviewScrollBoxTitle.current.style.transform = `translate3d(0,25%,0)`;
            if (window.innerWidth < 520) {
              objs.mainItemPreview.current.style.transform = `translate3d(17%,55%,0)`;
            } else if (window.innerWidth < 361) {
              objs.mainItemPreview.current.style.transform = `translate3d(20%,55%,0)`;
            } else {
              objs.mainItemPreview.current.style.transform = `translate3d(0,55%,0)`;
            }
            objs.mainItemPreviewTitle.current.style.opacity = `0`;
            objs.mainItemPreviewScrollBoxTitle.current.style.opacity = `0`;
            objs.mainItemPreview.current.style.opacity = `0`;
          }
          if (scrollRatio > 0.37) {
            objs.mainItemEditableTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemEditableSubTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemEditableDescBox.current.style.transform = `translate3d(0,0,0)`;
            setIsAni(true);
            objs.mainItemEditableTitle.current.style.opacity = `1`;
            objs.mainItemEditableSubTitle.current.style.opacity = `1`;
            objs.mainItemEditableDescBox.current.style.opacity = `1`;
          } else {
            setIsAni(false);
            objs.mainItemEditableTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableSubTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableDescBox.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableTitle.current.style.opacity = `0`;
            objs.mainItemEditableSubTitle.current.style.opacity = `0`;
            objs.mainItemEditableDescBox.current.style.opacity = `0`;
          }
        }
        break;
    }
  }, [yOffset]);

  const scrollLoop = useCallback(() => {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    console.log(`여기 y`, yOffset);
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      if (yOffset - prevScrollHeight < 0) {
        currentScene--;
        return;
      }
      console.log(`커렌트씬`, currentScene);
      currentScene--;
    }
    if (enterNewScene) return;
    playAnimation();
  }, []);

  const aos = {
    'data-aos': `fade-up`,
    'data-aos-offset': `-25`,
    'data-aos-delay': '0',
    'data-aos-duration': `600`,
    'data-aos-easing': 'ease',
    // 'data-aos-mirror': 'true',
    'data-aos-once': `false`,
    'data-aos-anchor-placement': 'top-bottom',
  };
  return (
    <div css={styles.flexRowCenter}>
      <section ref={introSection} css={styles.introSection}>
        <div ref={introSectionBox} css={styles.introSectionBox}>
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
                ref={introMonitorItemA}
                css={styles.introMonitorItem(clickItem === `ㅤ기록ㅤ`)}
                onClick={introClickHandler}
              >
                <div css={styles.introMonitorItemSvgBox}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  ㅤ기록ㅤ
                </div>
                <div
                  css={styles.introMonitorItemSvgText(clickItem === `ㅤ기록ㅤ`)}
                >
                  프로젝트의 아이디어 공유나 희의록을 공유할 수 있어요
                </div>
              </div>
              <div
                ref={introMonitorItemB}
                css={styles.introMonitorItem(clickItem === `ㅤ채팅ㅤ`)}
                onClick={introClickHandler}
              >
                <div css={styles.introMonitorItemSvgBox}>
                  <FontAwesomeIcon icon={faComments} />
                  ㅤ채팅ㅤ
                </div>
                <div
                  css={styles.introMonitorItemSvgText(clickItem === `ㅤ채팅ㅤ`)}
                >
                  팀원들과 실시간 채팅으로 소통할 수 있어요
                </div>
              </div>
              <div
                ref={introMonitorItemC}
                css={styles.introMonitorItem(clickItem === `커밋로그`)}
                onClick={introClickHandler}
              >
                <div css={styles.introMonitorItemSvgBox}>
                  <FontAwesomeIcon icon={faGithub} />
                  커밋로그
                </div>
                <div
                  css={styles.introMonitorItemSvgText(clickItem === `커밋로그`)}
                >
                  프로젝트를 깃허브와 연결해서 커밋로그 및 이슈를 확인할 수
                  있어요
                </div>
              </div>
              <div
                ref={introMonitorItemD}
                css={styles.introMonitorItem(clickItem === `진행상황`)}
                onClick={introClickHandler}
              >
                <div css={styles.introMonitorItemSvgBox}>
                  <FontAwesomeIcon icon={faListCheck} />
                  진행상황
                </div>
                <div
                  css={styles.introMonitorItemSvgText(clickItem === `진행상황`)}
                >
                  체크리스트를 만들어 진행상황을 %로 확인할 수 있어요
                </div>
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
                  priority
                />
                <div ref={introChatReplyBox} css={styles.introChatImgReplyBox}>
                  <div>팀원을 초대하고 프로젝트를 시작해 봅시다!</div>
                </div>
              </div>
              <div ref={introArrowDown} css={styles.arrowDownSvg}></div>
            </div>
          </div>
        </div>
      </section>
      <section ref={mainItemSectionA} css={styles.mainItemSectionA}>
        <div ref={mainItemSectionABox} css={styles.mainItemSectionABox}>
          <div css={styles.mainItemPreviewBox}>
            <h2 ref={mainItemPreviewTitle} css={styles.mainItemPreviewTitle}>
              {`아코하를 먼저\n👀 살펴볼까요?`}
            </h2>
            <div css={styles.mainItemLayoutBox}>
              <div css={styles.mainItemLayoutInnerBox}>
                <h3
                  ref={mainItemPreviewScrollBoxTitle}
                  css={styles.mainItemPreviewScrollBoxTitle}
                >
                  기능을 선택해 보세요
                </h3>
                <div css={styles.mainItemPreviewScrollBox}>
                  <div
                    aria-label={`ArrowLeft`}
                    css={styles.mainItemPreviewScrollArrowLeftBox}
                    onClick={arrowClickHandler}
                  >
                    <span css={styles.mainItemPreviewScrollArrowLeft}></span>
                  </div>
                  <div
                    aria-label={`ArrowRight`}
                    css={styles.mainItemPreviewScrollArrowRightBox}
                    onClick={arrowClickHandler}
                  >
                    <span css={styles.mainItemPreviewScrollArrowRight}></span>
                  </div>
                  <div
                    ref={mainItemPreviewScrollItemBox}
                    css={styles.mainItemPreviewScrollItemBox}
                  >
                    <span
                      aria-label={`previewNavName`}
                      css={styles.mainItemPreviewScrollItemNav(clickLabel)}
                      onClick={previewClickHandler}
                    >
                      프로젝트 메뉴
                    </span>
                    <span
                      aria-label={`previewNavAlert`}
                      css={styles.mainItemPreviewScrollItemAlert(clickLabel)}
                      onClick={previewClickHandler}
                    >
                      알림
                    </span>
                    <span
                      aria-label={`previewChannelPlus`}
                      css={styles.mainItemPreviewScrollItemChannelPlus(
                        clickLabel
                      )}
                      onClick={previewClickHandler}
                    >
                      프로젝트 생성
                    </span>
                    <span
                      aria-label={`previewPage`}
                      css={styles.mainItemPreviewScrollItemPage(clickLabel)}
                      onClick={previewClickHandler}
                    >
                      페이지 생성
                    </span>
                    <span
                      aria-label={`previewProgressBar`}
                      css={styles.mainItemPreviewScrollItemProgress(clickLabel)}
                      onClick={previewClickHandler}
                    >
                      진행상황
                    </span>
                    <span
                      aria-label={`previewCommitLog`}
                      css={styles.mainItemPreviewScrollItemCommitLog(
                        clickLabel
                      )}
                      onClick={previewClickHandler}
                    >
                      커밋/이슈
                    </span>
                    <span
                      aria-label={`previewBookmark`}
                      css={styles.mainItemPreviewScrollItemBookmark(clickLabel)}
                      onClick={previewClickHandler}
                    >
                      북마크
                    </span>
                  </div>
                </div>
              </div>
              {/* <CommitLogNavbar /> */}
              <div ref={mainItemPreview} css={styles.mainItemPreview}>
                <div css={styles.previewNav}>
                  <div
                    aria-label={`previewNavName`}
                    css={styles.previewNavItemA(clickLabel)}
                    onClick={previewClickHandler}
                  >
                    아코하
                    <span>
                      <ChevronDownIcon />
                    </span>
                    {clickLabel === `previewNavName` ? (
                      <div css={styles.previewNavName}>
                        <div>프로젝트 정보</div>
                        <div>프로젝트 초대하기</div>
                        <div>프로젝트 삭제하기</div>
                      </div>
                    ) : null}
                  </div>
                  <div
                    aria-label={`previewNavAlert`}
                    css={styles.previewNavAlert(clickLabel)}
                    onClick={previewClickHandler}
                  >
                    <BellAlertIcon />
                    {clickLabel === `previewNavAlert` ? (
                      <div css={styles.previewNavAlertClick}>
                        <div>
                          <span>BE 자바마스터님</span>께서 태그하셨습니다
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div css={styles.previewNavItemB}>
                    <div>
                      <span css={styles.previewNavItemBImg}>
                        <Image
                          src={previewGithub}
                          width={25}
                          height={25}
                          alt={`preview commitLogImg`}
                        />
                      </span>
                      <span>FE 김코딩</span>
                    </div>
                  </div>
                </div>
                <div css={styles.previewSidebar}>
                  <div css={styles.previewList}>
                    <div css={styles.previewChannelImgBox(clickLabel)}>
                      <Image
                        quality={100}
                        src={previewRed}
                        width={25}
                        height={25}
                        alt={`preview channelImg`}
                      />
                      <Image
                        quality={100}
                        src={previewGreen}
                        width={25}
                        height={25}
                        alt={`preview channelImg`}
                      />
                      <Image
                        quality={100}
                        src={previewPurple}
                        width={25}
                        height={25}
                        alt={`preview channelImg`}
                      />
                      <div
                        aria-label={`previewChannelPlus`}
                        onClick={previewClickHandler}
                      >
                        +
                        {clickLabel === `previewChannelPlus` ? (
                          <div css={styles.previewChannelImgPlus}>
                            <div>
                              <span>프로젝트 생성하기</span>
                              <input
                                type="text"
                                placeholder="프로젝트 이름을 입력해주세요"
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div css={styles.previewChannel}>
                    <div css={styles.previewChannelMenuBox}>
                      <div css={styles.previewChannelMenu}>
                        <div css={styles.previewChannelMenuTab(clickLabel)}>
                          일반
                          <span>
                            <ChevronDownIcon />
                          </span>
                          <span
                            aria-label={`previewPage`}
                            onClick={previewClickHandler}
                          >
                            +
                            {clickLabel === `previewPage` ? (
                              <div css={styles.previewChannelMenuTabClick}>
                                <div>
                                  <span>
                                    <DocumentIcon />
                                  </span>
                                  <div>
                                    <h3>기본</h3>
                                    <span>기본 페이지 입니다</span>
                                  </div>
                                </div>
                                <div>
                                  <span>
                                    <CalendarIcon />
                                  </span>
                                  <div>
                                    <h3>프로젝트</h3>
                                    <span>
                                      팀을 위한 프로젝트 관리 템플릿입니다.
                                      프로젝트별로 작업을 정리하고 팀 전반에
                                      걸쳐 진행 상황을 트래킹하세요
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <span>
                                    <ListBulletIcon />
                                  </span>
                                  <div>
                                    <h3>문서</h3>
                                    <span>
                                      한 곳에서 팀 문서를 정리하고 협업하세요
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </span>
                        </div>
                        <div>
                          <div>희의록</div>
                          <div>아이디어 공유</div>
                        </div>
                      </div>
                      <div css={styles.previewChannelMenu}>
                        <div css={styles.previewChannelMenuTab(clickLabel)}>
                          채팅
                          <span>
                            <ChevronDownIcon />
                          </span>
                          <span
                            aria-label={`previewPage`}
                            onClick={previewClickHandler}
                          >
                            +
                          </span>
                        </div>
                        <div>
                          <div>프론트엔드</div>
                          <div>백엔드</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div css={styles.previewMain}>
                    <div css={styles.previewMainItemBox}>
                      <div
                        aria-label={`previewProgressBar`}
                        css={styles.previewProgressBar(clickLabel)}
                        onClick={previewClickHandler}
                      >
                        <span css={styles.previewProgressBarSpan}></span>
                        <span>25%</span>
                        {clickLabel === `previewProgressBar` ? (
                          <div css={styles.previewProgressBarClick}>
                            <span>Todo List</span>를 만들고 진행률을 확인할 수
                            있습니다
                          </div>
                        ) : null}
                      </div>
                      <div css={styles.previewProgressTabBox}>
                        <div css={styles.previewProgressTab}>
                          <h3>todo</h3>
                          <div>게시판 만들기</div>
                          <span>+ 새로 만들기</span>
                        </div>
                        <div css={styles.previewProgressTab}>
                          <h3>preogress</h3>
                          <div>회원가입 API 만들기</div>
                          <span>+ 새로 만들기</span>
                        </div>
                        <div css={styles.previewProgressTab}>
                          <h3>complete</h3>
                          <div>프로젝트 세팅</div>
                          <span>+ 새로 만들기</span>
                        </div>
                      </div>
                      <div css={styles.previewCommitLog}>
                        <div
                          aria-label={`previewCommitLog`}
                          css={styles.previewCommitBox(clickLabel)}
                          onClick={previewClickHandler}
                        >
                          {clickLabel === `previewCommitLog` ? (
                            <div css={styles.previewCommitLogClick}>
                              <div>
                                <span>organization</span>
                                <span>repo</span>
                                <span>
                                  <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    style={{ color: '#f85d75' }}
                                  />
                                </span>
                              </div>
                              <div>
                                <span>we-ching 우리 모두의 칭찬</span>
                                <span>a-co-ha 프로젝트</span>
                              </div>
                              <div>Connect</div>
                            </div>
                          ) : null}
                          <div css={styles.previewCommitLogTitle}>
                            <Image
                              src={previewGithub}
                              width={25}
                              height={25}
                              alt={`preview commitLogImg`}
                            />
                            <span>A - COHA</span>
                          </div>
                          <div css={styles.previewCommitLogContent}>
                            <span>Client</span>
                            <span>Server</span>
                          </div>
                          <div css={styles.previewCommitLogBtnBox}>
                            <span css={styles.previewCommitLogBtn}>+</span>
                            <span>깃허브 연결하기</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div css={styles.previewUserList}>
                    <div css={styles.previewUserBox}>
                      <div css={styles.previewUser}>
                        <span css={styles.previewUserOn}></span>
                        <span>FE 김코딩</span>
                        <span>👑</span>
                      </div>
                      <div css={styles.previewUser}>
                        <span css={styles.previewUserOn}></span>
                        <span>FE 리액트</span>
                      </div>
                      <div css={styles.previewUser}>
                        <span css={styles.previewUserOn}></span>
                        <span>BE 자바마스터</span>
                      </div>
                      <div css={styles.previewUser}>
                        <span css={styles.previewUserOn}></span>
                        <span>BE 파이썬</span>
                      </div>
                    </div>
                  </div>
                  <div css={styles.previewBookmark}>
                    <div css={styles.previewBookmarkContent(clickLabel)}>
                      <div
                        aria-label={`previewBookmark`}
                        onClick={previewClickHandler}
                      >
                        <div>+ 북마크</div>
                        {clickLabel === `previewBookmark` ? (
                          <div css={styles.previewBookmarkContentClick}>
                            <h3>북마크 레퍼런스</h3>
                            <span>https://github.com/a-co-ha/client</span>
                            <div>
                              <span>Copy</span>
                              <div>
                                <span>Edit</span>
                                <span>Delete</span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div>북마크 공유</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.mainItemEditableBox}>
            <h2 ref={mainItemEditableTitle} css={styles.mainItemEditableTitle}>
              {`게시글 작성으로 \n손쉬운 문서화📄`}
            </h2>
            <div css={styles.mainItemEditableLayoutBox}>
              <div css={styles.mainItemEditableLayoutInnerBox}>
                <h3
                  ref={mainItemEditableSubTitle}
                  css={styles.mainItemEditableSubTitle}
                >
                  희의록 or 정보공유
                </h3>
                <div
                  ref={mainItemEditableDescBox}
                  css={styles.mainItemEditableDescBox}
                >
                  <h3>
                    페이지를 생성<span>하고 정보를 공유해 보세요</span>
                  </h3>
                </div>
              </div>
              <div
                ref={mainItemEditableA}
                css={styles.mainItemEditableA(isAni)}
              >
                <Image src={editableA} fill alt={`editable image A`} />
              </div>
              <div
                ref={mainItemEditableB}
                css={styles.mainItemEditableB(isAni)}
              >
                <Image src={editableB} fill alt={`editable image B`} />
              </div>
            </div>
          </div>
          <div css={styles.mainItemChatBox}>
            <h2 ref={mainItemChatTitle} css={styles.mainItemChatTitle}>
              {`실시간 채팅으로\n팀원들과 소통하며 \n좀 더 ⚡빠르게 개발해보세요!`}
            </h2>
            <div css={styles.mainItemChatLayoutBox}>
              <div css={styles.mainItemChatLayoutInnerBox}>
                <h3
                  ref={mainItemChatSubTitle}
                  css={styles.mainItemChatSubTitle}
                >
                  채팅 and 북마크
                </h3>
                <div ref={mainItemChatDescBox} css={styles.mainItemChatDescBox}>
                  <h3>
                    <span>중요한 내용을 </span>북마크에 저장
                    <span>하고 편하게 꺼내볼 수 있어요</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
