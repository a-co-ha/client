import { css, keyframes } from '@emotion/react';

export const loadingBackground = (position: string) => css`
  position: ${position};
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const loadingSpin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const loadingCircleAni = keyframes`
  0% { stroke-dashoffset: 157; }
	75% { stroke-dashoffset: -147; }
	100% { stroke-dashoffset: -157; }
`;

export const loadingCircle = css`
  width: 54px;
  height: 54px;
  animation: ${loadingSpin} 3s infinite;
  & > circle {
    stroke: black;
    stroke-width: 4;
    stroke-dasharray: 157, 157;
    stroke-dashoffset: 0;
    fill: transparent;
    animation: ${loadingCircleAni} 1s infinite;
  }
`;
