import { Loading } from '@/components/loading/Loading';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { throttle } from 'lodash';
import * as styles from './styles';
// import { Error } from './error';

const IndexPage = () => {
  const IntroSection = useRef<any>(null);
  const messageA = useRef<HTMLDivElement>(null);
  const messageB = useRef<HTMLDivElement>(null);
  const messageC = useRef<HTMLDivElement>(null);
  const messageD = useRef<HTMLDivElement>(null);
  console.log(`위messageA`, messageA);
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

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

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: IntroSection,
        messageA: messageA,
        messageB: messageB,
        messageC: messageC,
        messageD: messageD,
      },
      values: {
        messageB_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageC_translateX_in: [-100, 0, { start: 0.05, end: 0.3 }],
        messageD_translateX_in: [-80, 0, { start: 0.05, end: 0.3 }],
        messageA_translateY_in: [0, 20, { start: 0.05, end: 0.3 }],
        messageB_translateY_in: [0, 20, { start: 0.05, end: 0.3 }],
        messageC_translateY_in: [0, 20, { start: 0.05, end: 0.3 }],
        messageD_translateY_in: [0, 20, { start: 0.05, end: 0.3 }],
        messageB_translateX_out: [0, -100, { start: 0.05, end: 0.3 }],
        messageC_translateX_out: [0, -100, { start: 0.05, end: 0.3 }],
        messageD_translateX_out: [0, -80, { start: 0.05, end: 0.3 }],
        messageA_translateY_out: [20, 0, { start: 0.4, end: 0.6 }],
        messageB_translateY_out: [20, 0, { start: 0.4, end: 0.6 }],
        messageC_translateY_out: [20, 0, { start: 0.4, end: 0.6 }],
        messageD_translateY_out: [20, 0, { start: 0.4, end: 0.6 }],
        messageB_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        messageD_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
        messageD_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
      },
    },
  ];

  const setLayout = useCallback(() => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }
      if (sceneInfo[i].objs.container) {
        sceneInfo[
          i
        ].objs.container.current.style.height = `${sceneInfo[i].scrollHeight}px`;
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
          objs.messageA.current &&
          objs.messageB.current &&
          objs.messageC.current &&
          objs.messageD.current
        ) {
          if (scrollRatio <= 0.32) {
            console.log(`y`, objs.messageA.current);
            objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%, 0)`;
            objs.messageB.current.style.transform = `translate3d(${calcValues(
              values.messageB_translateX_in,
              currentYOffset
            )}%, ${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%, 0)`;
            objs.messageB.current.style.opacity = `${calcValues(
              values.messageB_opacity_in,
              currentYOffset
            )}`;
            objs.messageC.current.style.transform = `translate3d(${calcValues(
              values.messageC_translateX_in,
              currentYOffset
            )}%, ${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%, 0)`;
            objs.messageD.current.style.transform = `translate3d(${calcValues(
              values.messageD_translateX_in,
              currentYOffset
            )}%, ${calcValues(
              values.messageD_translateY_in,
              currentYOffset
            )}%, 0)`;
            objs.messageD.current.style.opacity = `${calcValues(
              values.messageD_opacity_in,
              currentYOffset
            )}`;
            // in
          } else {
            // out
            objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%, 0)`;
            objs.messageB.current.style.transform = `translate3d(${calcValues(
              values.messageB_translateX_out,
              currentYOffset
            )}%, ${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%, 0)`;
            objs.messageB.current.style.opacity = `${calcValues(
              values.messageB_opacity_out,
              currentYOffset
            )}`;
            objs.messageC.current.style.transform = `translate3d(${calcValues(
              values.messageC_translateX_out,
              currentYOffset
            )}%, ${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%, 0)`;
            objs.messageD.current.style.transform = `translate3d(${calcValues(
              values.messageD_translateX_out,
              currentYOffset
            )}%, ${calcValues(
              values.messageD_translateY_out,
              currentYOffset
            )}%, 0)`;
            objs.messageD.current.style.opacity = `${calcValues(
              values.messageD_opacity_out,
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

  return (
    <div css={styles.flexRowCenter}>
      <section
        ref={IntroSection}
        css={{
          outline: `2px solid limegreen`,
          width: `100%`,
          // background: `#eee`,
        }}
      >
        <div css={styles.mainTitleBox}>
          <div ref={messageA}>아코</div>
          <div ref={messageB}>딩</div>
          <div ref={messageC}>하</div>
          <div ref={messageD}>고싶다</div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
