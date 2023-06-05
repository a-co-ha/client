import { css, keyframes } from '@emotion/react';

export const mainContainer = css`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const progressContainer = css`
  flex-basis: 0;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  height: calc(100vh - 50px);
  padding-right: 44px;
  padding-bottom: 2rem;
  overflow: hidden scroll;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 5px solid transparent;
    background-color: #efefef;
    border-radius: 0.5rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const progressSection = css`
  flex-basis: 30%;
`;

export const progressInPage = css`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 8px 10px 6px 6px;
  border-radius: 5px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 5rem;
`;

export const d = css`
  padding: 0 0.3rem;
  font-size: 0.8rem;
`;

export const gaugeContainer = css`
  align-self: flex-end;
  display: flex;
`;

export const progress = (dealt: number) => css`
  width: 10rem;
  height: 1rem;
  background-color: white;
  border: ${dealt >= 80 ? '#3c9ee5' : dealt >= 50 ? '#4CC790' : '#ff9f00'};
  box-shadow: 0 0 2px
    ${dealt >= 80 ? '#3c9ee5' : dealt >= 50 ? '#4CC790' : '#ff9f00'};
  margin-right: 1rem;
  border-radius: 1rem;
  ${dealt === 100
    ? `filter: drop-shadow(0 0 2px ${
        dealt >= 80 ? '#3c9ee5' : dealt >= 50 ? '#4CC790' : '#ff9f00'
      })`
    : ''}
`;
export const dealt = (dealt: number) => css`
  width: ${dealt + '%'};
  height: 100%;
  border-radius: 1rem;
  background-color: ${dealt >= 80
    ? '#3c9ee5'
    : dealt >= 50
    ? '#4CC790'
    : '#ff9f00'};
`;

export const singleChart = () => css`
  width: 7rem;
  justify-content: space-around;
`;

export const circularChart = () => css`
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
`;

export const circleBg = () => css`
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
`;

const progressKeyframes = keyframes`
  0% {
    stroke-dasharray: 0 100;
  }
`;

export const circle = (dealt: number) => css`
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: ${progressKeyframes} 1s ease-out forwards;
  stroke: ${dealt >= 80 ? '#3c9ee5' : dealt >= 50 ? '#4CC790' : '#ff9f00'};
`;

export const percentage = css`
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
  animation: ${progressKeyframes};
`;
