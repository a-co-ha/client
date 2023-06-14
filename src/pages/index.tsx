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
import { useSetRecoilState } from 'recoil';
import { loginModalState } from '@/recoil/user/atom';
import { LandingPageNavbarIsScroll } from '@/recoil/project/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faPenToSquare,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import chat from '@/images/landingPage/chat.svg';
import Image from 'next/image';
import previewRed from '@/images/channelImg/1.png';
import previewGreen from '@/images/channelImg/6.png';
import previewPurple from '@/images/channelImg/7.png';
import previewGithub from '@/images/githubLogo.png';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellAlertIcon,
  DocumentIcon,
  ListBulletIcon,
  CalendarIcon,
} from '@heroicons/react/20/solid';
import editableA from '@/images/landingPage/editableA.png';
import editableB from '@/images/landingPage/editableB.png';
import acohaAI from '@/images/landingPage/ai.png';
import chatPink from '@/images/channelImg/9.png';
import chatYellow from '@/images/channelImg/5.png';
import commitLog from '@/images/landingPage/commit.png';
import issueLog from '@/images/landingPage/issue.png';
import check from '@/images/landingPage/check.png';

const IndexPage = () => {
  const scrollToTopBtn = useRef<HTMLDivElement>(null);
  const indexLinkBtn = useRef<HTMLDivElement>(null);
  const indexLinkTranslateBox = useRef<HTMLDivElement>(null);
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
  const mainItemChatBookmark = useRef<HTMLDivElement>(null);
  const mainItemCommitLogTitle = useRef<HTMLHeadingElement>(null);
  const mainItemCommitLogSubTitle = useRef<HTMLHeadingElement>(null);
  const mainItemCommitLogDescBox = useRef<HTMLDivElement>(null);
  const mainItemProgressTitle = useRef<HTMLHeadingElement>(null);
  const mainItemProgressSubTitle = useRef<HTMLHeadingElement>(null);
  const mainItemProgressDescBox = useRef<HTMLDivElement>(null);

  const [indexOrder, setIndexOrder] = useState('');
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [clickItem, setClickItem] = useState('');
  const [clickLabel, setClickLabel] = useState('');
  const [isEditableAni, setIsEditableAni] = useState(false);
  const [isChatAni, setIsChatAni] = useState(false);
  const [isChatBookmarkAni, setIsChatBookmarkAni] = useState(false);
  const [isCommitLogAni, setIsCommitLogAni] = useState(false);
  const [isProgressAni, setIsProgressAni] = useState(false);
  const setIsLoginModalOpen = useSetRecoilState(loginModalState);
  const setIsScroll = useSetRecoilState(LandingPageNavbarIsScroll);
  console.log(`위messageA`, messageA);
  let yOffset = 0; // window.scrollY 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  let scrollToCount = 1;

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (!messageA.current) return;
        yOffset = window.scrollY;
        scrollLoop();
        // console.log(`scrollLoop`);
      }, 30),
    [yOffset]
  );
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
    return () => {
      window.addEventListener(`scroll`, throttledScroll);
    };
  }, [throttledScroll]);

  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth > 900) {
  //       window.location.reload();
  //     }
  //   });
  // });

  useEffect(() => {
    if (!isIndexOpen && indexLinkTranslateBox.current) {
      if (indexOrder === `index1`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(0,0,0)`;
      } else if (indexOrder === `index2`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-125px,0,0)`;
      } else if (indexOrder === `index3`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-250px,0,0)`;
      } else if (indexOrder === `index4`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-375px,0,0)`;
      } else if (indexOrder === `index5`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-500px,0,0)`;
      }
    }
  }, [isIndexOpen, indexOrder]);

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
      if (scrollToCount === -1) {
        scrollToCount = 6;
      }
      scrollBox.scrollTo({
        left: scrollBox.offsetWidth * scrollToCount,
        behavior: 'smooth',
      });
      console.log(`left`, scrollBox.offsetWidth);
      console.log(`scCount`, scrollToCount);
    } else if (targetLabel === `ArrowRight` && scrollBox) {
      scrollToCount++;
      if (scrollToCount === 7) {
        scrollToCount = 0;
      }
      scrollBox.scrollTo({
        left: scrollBox.offsetWidth * scrollToCount,
        behavior: 'smooth',
      });
      console.log(`scCount`, scrollToCount);
    }
  };

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOpenHandler = () => {
    isIndexOpen ? setIsIndexOpen(false) : setIsIndexOpen(true);
    if (!isIndexOpen && indexLinkTranslateBox.current) {
      console.log(`안쪽 isopen?`, isIndexOpen);
      indexLinkTranslateBox.current.style.transform = `translate3d(0,0,0)`;
    } else if (isIndexOpen && indexLinkTranslateBox.current) {
      if (indexOrder === `index1`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(0,0,0)`;
      } else if (indexOrder === `index2`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-125px,0,0)`;
      } else if (indexOrder === `index3`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-250px,0,0)`;
      } else if (indexOrder === `index4`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-375px,0,0)`;
      } else if (indexOrder === `index5`) {
        indexLinkTranslateBox.current.style.transform = `translate3d(-500px,0,0)`;
      }
    }
  };
  console.log(`open?`, isIndexOpen);
  const indexLinkHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    const targetLabel = target.ariaLabel;
    if (targetLabel === `index1` && mainItemSectionA.current?.offsetTop) {
      window.scrollTo({
        top: mainItemSectionA.current?.offsetTop - 40,
        behavior: `smooth`,
      });
    } else if (
      targetLabel === `index2` &&
      mainItemEditableTitle.current?.offsetTop
    ) {
      window.scrollTo({
        top: mainItemEditableTitle.current?.offsetTop - 80,
        behavior: `smooth`,
      });
    } else if (
      targetLabel === `index3` &&
      mainItemChatTitle.current?.offsetTop
    ) {
      window.scrollTo({
        top: mainItemChatTitle.current?.offsetTop - 80,
        behavior: `smooth`,
      });
    } else if (
      targetLabel === `index4` &&
      mainItemCommitLogTitle.current?.offsetTop
    ) {
      window.scrollTo({
        top: mainItemCommitLogTitle.current?.offsetTop - 80,
        behavior: `smooth`,
      });
    } else if (
      targetLabel === `index5` &&
      mainItemProgressTitle.current?.offsetTop
    ) {
      window.scrollTo({
        top: mainItemProgressTitle.current?.offsetTop - 80,
        behavior: `smooth`,
      });
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
      heightNum: 5.5,
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
        mainItemChatBookmark: mainItemChatBookmark,
        mainItemCommitLogTitle: mainItemCommitLogTitle,
        mainItemCommitLogSubTitle: mainItemCommitLogSubTitle,
        mainItemCommitLogDescBox: mainItemCommitLogDescBox,
        mainItemProgressTitle: mainItemProgressTitle,
        mainItemProgressSubTitle: mainItemProgressSubTitle,
        mainItemProgressDescBox: mainItemProgressDescBox,
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

      if (sceneInfo[0].objs.container) {
        sceneInfo[0].objs.container.current.style.height = `${
          sceneInfo[0].scrollHeight + window.innerHeight
        }px`;
      } else if (sceneInfo[1].objs.container) {
        sceneInfo[1].objs.container.current.style.height = `${sceneInfo[1].scrollHeight}px`;
        // sceneInfo[1].objs.container.current.style.height = `8289.5px`;
      }
    }

    yOffset = window.scrollY;
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
    const scrollRatio = currentYOffset / scrollHeight;
    yOffset > 1 ? setIsScroll(true) : setIsScroll(false);
    let mediaScrollRatioA;
    let mediaScrollRatioB;
    let mediaScrollRatioC;
    let mediaScrollRatioD;
    let mediaScrollRatioE;
    // editable
    if (window.innerWidth > 1520) {
      mediaScrollRatioA = 0.15;
    } else if (window.innerWidth < 1520 && window.innerWidth > 768) {
      if (window.innerHeight > 1300) {
        mediaScrollRatioA = 0.15;
      } else {
        mediaScrollRatioA = 0.22;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 361) {
      mediaScrollRatioA = 0.19;
    } else if (window.innerWidth < 361) {
      mediaScrollRatioA = 0.2;
    }
    // chat
    if (window.innerWidth > 1520) {
      mediaScrollRatioB = 0.29;
    } else if (window.innerWidth < 1520 && window.innerWidth > 768) {
      if (window.innerHeight > 1300) {
        mediaScrollRatioB = 0.29;
      } else {
        mediaScrollRatioB = 0.43;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 361) {
      mediaScrollRatioB = 0.345;
    } else if (window.innerWidth < 361) {
      mediaScrollRatioB = 0.37;
    }
    // bookmark
    if (window.innerWidth > 1520) {
      mediaScrollRatioC = 0.412;
    } else if (window.innerWidth < 1520 && window.innerWidth > 768) {
      if (window.innerHeight > 1300) {
        mediaScrollRatioC = 0.412;
      } else {
        mediaScrollRatioC = 0.583;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 361) {
      mediaScrollRatioC = 0.485;
    } else if (window.innerWidth < 361) {
      mediaScrollRatioC = 0.455;
    }
    // commitLog
    if (window.innerWidth > 1520) {
      mediaScrollRatioD = 0.531;
    } else if (window.innerWidth < 1520 && window.innerWidth > 768) {
      if (window.innerHeight > 1300) {
        mediaScrollRatioD = 0.531;
      } else {
        mediaScrollRatioD = 0.765;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 361) {
      mediaScrollRatioD = 0.63;
    } else if (window.innerWidth < 361) {
      mediaScrollRatioD = 0.652;
    }
    // progress
    if (window.innerWidth > 1520) {
      mediaScrollRatioE = 0.871;
    } else if (window.innerWidth < 1520 && window.innerWidth > 768) {
      if (window.innerHeight > 1300) {
        mediaScrollRatioE = 0.871;
      } else {
        mediaScrollRatioE = 0.95;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 361) {
      mediaScrollRatioE = 0.792;
    } else if (window.innerWidth < 361) {
      mediaScrollRatioE = 0.825;
    }
    switch (currentScene) {
      case 0:
        if (
          scrollToTopBtn.current &&
          indexLinkBtn.current &&
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
            scrollToTopBtn.current.style.opacity = `0`;
            indexLinkBtn.current.style.opacity = `0`;
            objs.messageBox.current.style.transform = `translate3d(${calcValues(
              window.innerHeight > 1300 && window.innerWidth > 1520
                ? [0, 80, { start: 0.05, end: 0.75 }]
                : values.messageBox_translateX_in,
              currentYOffset
            )}%,${calcValues(
              window.innerHeight > 1300
                ? [-50, 200, { start: 0.4, end: 0.75 }]
                : values.messageBox_translateY_in,
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
          scrollToTopBtn.current &&
          indexLinkBtn.current &&
          indexLinkTranslateBox.current &&
          objs.mainItemPreviewTitle?.current &&
          objs.mainItemPreview.current &&
          objs.mainItemPreviewScrollBoxTitle.current &&
          objs.mainItemEditableTitle.current &&
          objs.mainItemEditableSubTitle.current &&
          objs.mainItemEditableDescBox.current &&
          objs.mainItemChatTitle.current &&
          objs.mainItemChatSubTitle.current &&
          objs.mainItemChatDescBox.current &&
          objs.mainItemChatBookmark.current &&
          objs.mainItemCommitLogTitle.current &&
          objs.mainItemCommitLogSubTitle.current &&
          objs.mainItemCommitLogDescBox.current &&
          objs.mainItemProgressTitle.current &&
          objs.mainItemProgressSubTitle.current &&
          objs.mainItemProgressDescBox.current &&
          mediaScrollRatioA &&
          mediaScrollRatioB &&
          mediaScrollRatioC &&
          mediaScrollRatioD &&
          mediaScrollRatioE
        ) {
          if (sceneInfo[0].objs.content.current) {
            sceneInfo[0].objs.content.current.style.position = `static`;
          }
          console.log(`scene2`, scrollRatio);
          if (scrollRatio > 0.03) {
            setIndexOrder(`index1`);
            console.log(`실제`, isIndexOpen);
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
          if (scrollRatio > 0.15 && window.innerWidth >= 756) {
            scrollToTopBtn.current.style.opacity = `1`;
            indexLinkBtn.current.style.opacity = `1`;
          } else {
            scrollToTopBtn.current.style.opacity = `0`;
            indexLinkBtn.current.style.opacity = `0`;
          }
          if (scrollRatio > mediaScrollRatioA) {
            setIndexOrder(`index2`);
            objs.mainItemEditableTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemEditableSubTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemEditableDescBox.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemEditableTitle.current.style.opacity = `1`;
            objs.mainItemEditableSubTitle.current.style.opacity = `1`;
            objs.mainItemEditableDescBox.current.style.opacity = `1`;
            setIsEditableAni(true);
          } else {
            objs.mainItemEditableTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableSubTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableDescBox.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemEditableTitle.current.style.opacity = `0`;
            objs.mainItemEditableSubTitle.current.style.opacity = `0`;
            objs.mainItemEditableDescBox.current.style.opacity = `0`;
            setIsEditableAni(false);
          }
          if (scrollRatio > mediaScrollRatioB) {
            setIndexOrder(`index3`);
            objs.mainItemChatTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemChatSubTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemChatDescBox.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemChatTitle.current.style.opacity = `1`;
            objs.mainItemChatSubTitle.current.style.opacity = `1`;
            objs.mainItemChatDescBox.current.style.opacity = `1`;
            setIsChatAni(true);
          } else {
            objs.mainItemChatTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemChatSubTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemChatDescBox.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemChatTitle.current.style.opacity = `0`;
            objs.mainItemChatSubTitle.current.style.opacity = `0`;
            objs.mainItemChatDescBox.current.style.opacity = `0`;
            setIsChatAni(false);
          }
          if (scrollRatio > mediaScrollRatioC) {
            objs.mainItemChatBookmark.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemChatBookmark.current.style.opacity = `1`;
            setIsChatBookmarkAni(true);
          } else {
            objs.mainItemChatBookmark.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemChatBookmark.current.style.opacity = `0`;
            setIsChatBookmarkAni(false);
          }
          if (scrollRatio > mediaScrollRatioD) {
            setIndexOrder(`index4`);
            objs.mainItemCommitLogTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemCommitLogSubTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemCommitLogDescBox.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemCommitLogTitle.current.style.opacity = `1`;
            objs.mainItemCommitLogSubTitle.current.style.opacity = `1`;
            objs.mainItemCommitLogDescBox.current.style.opacity = `1`;
            setIsCommitLogAni(true);
          } else {
            objs.mainItemCommitLogTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemCommitLogSubTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemCommitLogDescBox.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemCommitLogTitle.current.style.opacity = `0`;
            objs.mainItemCommitLogSubTitle.current.style.opacity = `0`;
            objs.mainItemCommitLogDescBox.current.style.opacity = `0`;
            setIsCommitLogAni(false);
          }
          if (scrollRatio > mediaScrollRatioE) {
            setIndexOrder(`index5`);
            objs.mainItemProgressTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemProgressSubTitle.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemProgressDescBox.current.style.transform = `translate3d(0,0,0)`;
            objs.mainItemProgressTitle.current.style.opacity = `1`;
            objs.mainItemProgressSubTitle.current.style.opacity = `1`;
            objs.mainItemProgressDescBox.current.style.opacity = `1`;
            setIsProgressAni(true);
          } else {
            objs.mainItemProgressTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemProgressSubTitle.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemProgressDescBox.current.style.transform = `translate3d(0,25%,0)`;
            objs.mainItemProgressTitle.current.style.opacity = `0`;
            objs.mainItemProgressSubTitle.current.style.opacity = `0`;
            objs.mainItemProgressDescBox.current.style.opacity = `0`;
            setIsProgressAni(false);
          }
          if (window.innerHeight > 1300) {
            if (window.innerWidth < 1520) {
              if (scrollRatio > 0.95) {
                indexLinkBtn.current.style.opacity = `0`;
              }
            } else {
              if (scrollRatio > 0.92) {
                indexLinkBtn.current.style.opacity = `0`;
              }
            }
          } else {
            if (scrollRatio > 0.9) {
              indexLinkBtn.current.style.opacity = `0`;
            }
          }
        }
        break;
    }
  }, [yOffset, isIndexOpen]);

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

  return (
    <div css={styles.flexRowCenter}>
      <div
        ref={scrollToTopBtn}
        css={styles.scrollToTopBtn}
        onClick={scrollToTopHandler}
      >
        <ChevronUpIcon />
      </div>
      <div ref={indexLinkBtn} css={styles.indexLinkBtnBox(isIndexOpen)}>
        <div css={styles.indexLinkBtnInnerBox(isIndexOpen)}>
          <div
            css={styles.indexLinkBtnLeftArrow(isIndexOpen)}
            onClick={indexOpenHandler}
          >
            <ChevronLeftIcon />
          </div>
          <div
            css={styles.indexLinkBtnRightArrow(isIndexOpen)}
            onClick={indexOpenHandler}
          >
            <ChevronRightIcon />
          </div>
          <div
            css={styles.indexLinkBtn(isIndexOpen)}
            onClick={indexLinkHandler}
          >
            <div ref={indexLinkTranslateBox}>
              <span
                aria-label="index1"
                css={{
                  color:
                    indexOrder === `index1` ? `white` : `rgba(255,255,255,0.6)`,
                }}
              >
                아코하 살펴보기
              </span>
              <span
                aria-label="index2"
                css={{
                  color:
                    indexOrder === `index2` ? `white` : `rgba(255,255,255,0.6)`,
                }}
              >
                희의록&middot;정보공유
              </span>
              <span
                aria-label="index3"
                css={{
                  color:
                    indexOrder === `index3` ? `white` : `rgba(255,255,255,0.6)`,
                }}
              >
                채팅&middot;북마크
              </span>
              <span
                aria-label="index4"
                css={{
                  color:
                    indexOrder === `index4` ? `white` : `rgba(255,255,255,0.6)`,
                }}
              >
                커밋&middot;이슈로그
              </span>
              <span
                aria-label="index5"
                css={{
                  color:
                    indexOrder === `index5` ? `white` : `rgba(255,255,255,0.6)`,
                }}
              >
                진행상황
              </span>
            </div>
          </div>
        </div>
      </div>
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
                          <span>BE 노드마스터님</span>께서 태그하셨습니다
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
                        <span>33%</span>
                        {clickLabel === `previewProgressBar` ? (
                          <div css={styles.previewProgressBarClick}>
                            <span>Todo List</span>를 만들고 진행률을 확인할 수
                            있습니다
                          </div>
                        ) : null}
                      </div>
                      <div css={styles.previewProgressTabBox}>
                        <div css={styles.previewProgressTab}>
                          <h3>시작 전</h3>
                          <div>게시판 만들기</div>
                          <span>+ 새로 만들기</span>
                        </div>
                        <div css={styles.previewProgressTab}>
                          <h3>진행 중</h3>
                          <div>회원가입 API 만들기</div>
                          <span>+ 새로 만들기</span>
                        </div>
                        <div css={styles.previewProgressTab}>
                          <h3>완료</h3>
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
                        <span>BE 노드마스터</span>
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
              {`게시글 작성으로 \n손쉽게 문서화📄`}
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
                css={styles.mainItemEditableA(isEditableAni)}
              >
                <Image src={editableA} fill alt={`editable image A`} />
              </div>
              <div
                ref={mainItemEditableB}
                css={styles.mainItemEditableB(isEditableAni)}
              >
                <Image src={editableB} fill alt={`editable image B`} />
              </div>
            </div>
          </div>
          <div css={styles.mainItemChatBox}>
            <h2 ref={mainItemChatTitle} css={styles.mainItemChatTitle}>
              {`실시간 채팅으로\n팀원들과 소통하며\n좀 더 ⚡빠르게\n개발해보세요!`}
            </h2>
            <div css={styles.mainItemChatLayoutBox}>
              <div css={styles.mainItemChatLayoutInnerBox}>
                <h3
                  ref={mainItemChatSubTitle}
                  css={styles.mainItemChatSubTitle}
                >
                  채팅
                </h3>
                <div ref={mainItemChatDescBox} css={styles.mainItemChatDescBox}>
                  <h3>
                    실시간 채팅
                    <span>으로 대화와함께 코드도 공유 할 수 있어요</span>
                  </h3>
                </div>
              </div>
              <div css={styles.mainItemChatA(isChatAni)}>
                <div css={styles.mainItemChatAInnerBox}>
                  <div css={styles.mainItemChatImageBoxA}>
                    <Image src={chatPink} fill alt="chatPink image" />
                  </div>
                  <div css={styles.mainItemChatMessageBox}>
                    <div>
                      <span>FE 김코딩</span>
                      <span>오늘 오후 7:07</span>
                    </div>
                    <span>코드 공유 드릴게요!</span>
                  </div>
                </div>
                <div css={styles.mainItemChatAInnerBox}>
                  <div css={styles.mainItemChatImageBoxA}>
                    <Image src={chatPink} fill alt="chatPink image" />
                  </div>
                  <div css={styles.mainItemChatMessageBox}>
                    <div>
                      <span>FE 김코딩</span>
                      <span>오늘 오후 7:07</span>
                    </div>
                    <span>
                      <span css={styles.mainItemChatMessageCode}>
                        <i>1</i>
                        <span>const</span> acoha<span> = </span>
                        <span>`welcome`;</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div css={styles.mainItemChatAInnerBox}>
                  <div css={styles.mainItemChatImageBoxA}>
                    <Image src={chatYellow} fill alt="chatPink image" />
                  </div>
                  <div css={styles.mainItemChatMessageBox}>
                    <div>
                      <span>FE 리액트</span>
                      <span>오늘 오후 7:08</span>
                    </div>
                    <span>감사합니다. 북마크에 저장해놓을게요!</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={mainItemChatBookmark} css={styles.mainItemChatLayoutBox}>
              <div css={styles.mainItemChatLayoutInnerBox}>
                <h3 css={styles.mainItemChatSubTitle}>북마크</h3>
                <div css={styles.mainItemChatDescBox}>
                  <h3>
                    <span>중요한 내용을 </span>북마크에 저장
                    <span>하고 원할 때 꺼내볼 수 있어요</span>
                  </h3>
                </div>
              </div>
              <div css={styles.mainItemChatBookmarkA(isChatBookmarkAni)}>
                <div>
                  <div>
                    <div>+ 북마크</div>
                    <div>
                      <div>프론트 컨벤션</div>
                      <div>백엔드 API</div>
                      <div>welcome acoha!</div>
                    </div>
                  </div>
                  <div>
                    <h3>welcome acoha!</h3>
                    <span>
                      <span css={styles.mainItemChatMessageCode}>
                        <i>1</i>
                        <span>const</span> acoha<span> = </span>
                        <span>`welcome`;</span>
                      </span>
                    </span>
                    <div>
                      <div>
                        <span>Copy</span>
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div css={styles.mainItemChatBookmarkB(isChatBookmarkAni)}>
                <div>
                  <div>
                    <div aria-label="제목"></div>
                    <div aria-label="내용을 입력해주세요"></div>
                    <div>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={{ color: '#f85d75' }}
                        fill={`true`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.mainItemCommitLogBox}>
            <h2
              ref={mainItemCommitLogTitle}
              css={styles.mainItemCommitLogTitle}
            >
              {`깃허브 저장소를\n연결하고 커밋과 이슈\n🔍기록들을 한 눈에!`}
            </h2>
            <div css={styles.mainItemCommitLogLayoutBox}>
              <div css={styles.mainItemCommitLogLayoutInnerBox}>
                <h3
                  ref={mainItemCommitLogSubTitle}
                  css={styles.mainItemCommitLogSubTitle}
                >
                  커밋 or 이슈 로그
                </h3>
                <div
                  ref={mainItemCommitLogDescBox}
                  css={styles.mainItemCommitLogDescBox}
                >
                  <h3>
                    <span>팀원들의</span> 개발상황<span>이나 </span>
                    트러블슈팅<span>을 버튼 하나로 확인해 보세요</span>
                  </h3>
                </div>
              </div>
              <div css={styles.mainItemCommitLogA}>
                <div>
                  <div css={styles.mainItemCommitLogConnectBox}>
                    <div
                      css={styles.mainItemCommitLogConnectInnerBox(
                        isCommitLogAni
                      )}
                    >
                      <div css={styles.mainItemCommitLogConnectTitle}>
                        <Image
                          src={previewGithub}
                          width={25}
                          height={25}
                          alt={`mainItem commitLogImg`}
                        />
                        <span>A - COHA</span>
                      </div>
                      <div css={styles.mainItemCommitLogContent}>
                        <span>Client</span>
                        <span>Server</span>
                      </div>
                      <div css={styles.mainItemCommitLogBtnBox}>
                        <span css={styles.mainItemCommitLogBtn}>+</span>
                        <span>깃허브 연결하기</span>
                      </div>
                    </div>
                    <div css={styles.mainItemCommitLogImageBox(isCommitLogAni)}>
                      <div css={styles.mainItemCommitLogImageInnerBox}>
                        <Image
                          src={commitLog}
                          fill
                          alt={`mainItem commitLogImg`}
                          quality={100}
                        />
                      </div>
                    </div>
                    <div css={styles.mainItemIssueLogImageBox(isCommitLogAni)}>
                      <div css={styles.mainItemIsuueLogImageInnerBox}>
                        <Image
                          src={issueLog}
                          fill
                          alt={`mainItem issueLog Image`}
                          quality={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.mainItemProgressBox}>
            <h2 ref={mainItemProgressTitle} css={styles.mainItemProgressTitle}>
              {`Todo 리스트 모아보기로\n현재 개발상황을 바로파악`}
              <Image
                src={check}
                width={50}
                height={50}
                alt={`progress Image`}
              />
            </h2>
            <div css={styles.mainItemProgressLayoutBox(isProgressAni)}>
              <div css={styles.mainItemProgressLayoutInnerBox}>
                <h3
                  ref={mainItemProgressSubTitle}
                  css={styles.mainItemProgressSubTitle}
                >
                  진행상황
                </h3>
                <div
                  ref={mainItemProgressDescBox}
                  css={styles.mainItemProgressDescBox}
                >
                  <h3>
                    목표<span>를 설정하고 하나씩 이뤄나가면서 </span>
                    성취감<span>을 맛보세요</span>
                  </h3>
                </div>
              </div>
              <div css={styles.mainItemProgressA(isProgressAni)}>
                <div>
                  <div>
                    <div css={styles.mainItemProgressAbarBox(isProgressAni)}>
                      <span
                        css={styles.mainItemProgressAbar(isProgressAni)}
                      ></span>
                      <span aria-label="33%">ㅤㅤㅤㅤ</span>
                    </div>
                    <div css={styles.mainItemProgressTabBox(isProgressAni)}>
                      <div css={styles.mainItemProgressTab}>
                        <h3>시작 전</h3>
                        <div>게시판 만들기</div>
                        <span>+ 새로 만들기</span>
                      </div>
                      <div css={styles.mainItemProgressTab}>
                        <h3>진행 중</h3>
                        <div>회원가입 API 만들기</div>
                        <span>+ 새로 만들기</span>
                      </div>
                      <div css={styles.mainItemProgressTab}>
                        <h3>완료</h3>
                        <div>프로젝트 세팅</div>
                        <span>+ 새로 만들기</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div css={styles.mainItemProgressB(isProgressAni)}>
                <div>
                  <div>
                    <CalendarIcon />
                    <div>
                      <div></div>
                      <div>1주차 스프린트</div>
                    </div>
                    <div>
                      <div>
                        <svg css={styles.progressSvg} strokeLinecap="round">
                          <circle cx="50%" cy="50%" r="70"></circle>
                        </svg>
                      </div>
                      <div>2주차 스프린트</div>
                    </div>
                    <div>
                      <div>
                        <svg css={styles.progressSvg} strokeLinecap="round">
                          <circle cx="50%" cy="50%" r="70"></circle>
                        </svg>
                      </div>
                      <div>3주차 스프린트</div>
                    </div>
                    <div>
                      <div>
                        <svg css={styles.progressSvg} strokeLinecap="round">
                          <circle cx="50%" cy="50%" r="70"></circle>
                        </svg>
                      </div>
                      <div>4주차 스프린트</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.bannerBox}>
            <div css={styles.bannerLayoutBox}>
              <div css={styles.bannerLayoutInnerBox}>
                <div css={styles.bannerImageBox}>
                  <div></div>
                  <div>
                    <div>새로운 프로젝트를 시작해 보세요!</div>{' '}
                  </div>
                  <button
                    css={styles.bannerBtn}
                    onClick={() => {
                      setIsLoginModalOpen(true);
                    }}
                  >
                    지금 시작하기
                  </button>
                  <Image src={acohaAI} fill alt="acoha ai image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section css={styles.footer}>
        <div>
          <h3>ACOHA : 아 코딩하고싶다</h3>
          <div>&copy; acoha team</div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
