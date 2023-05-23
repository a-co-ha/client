import { css, keyframes } from '@emotion/react';

const subTitleAni = keyframes`
  to {
    opacity: 1;
    top: -100%;
  }
`;
const mainTitleAni = keyframes`
  to {
    opacity: 1;
    top: 35%;
  }
`;

const introMonitorBoxAniIn = keyframes`
  to {
    opacity: 1;
    top: -200%;
  }
`;
const introMonitorBoxAniOut = keyframes`
  to {
    top: 100%;
  }
`;

export const flexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const mainTitleSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const mainTitleBox = css`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 35%;
  left: 50%;
  width: 50%;
  height: 50px;
  opacity: 1;
  transform: translate3d(-50%, -50%, 0);
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const mainTitleDesc = css`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  animation: ${subTitleAni} 0.7s 1.8s forwards;
`;

export const messageBox = css`
  display: flex;
  position: absolute;
  top: 100%;
  left: 0%;
  margin: 1rem 0;
  color: #ffd6dc;
  font-size: 4rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  animation: ${mainTitleAni} 0.7s 2.3s forwards;
  @media screen and (max-width: 768px) {
    font-size: 3rem;
    margin: 0;
  }
`;

export const messages = css`
  z-index: 2;
  &:nth-child(4) {
  }
  &:nth-child(3) {
    transform: translate3d(-100%, 0, 0);
  }
  &:nth-child(4) {
    transform: translate3d(-100%, 0, 0);
  }
  &:nth-child(2) {
    opacity: 0;
  }
  &:nth-child(5) {
    opacity: 0;
  }
  &:nth-child(6) {
    opacity: 0;
  }
  &:nth-child(7) {
    opacity: 0;
  }
`;

export const messageBackground = css`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  z-index: 1;
  line-height: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: #ffd6dc;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &::after {
    position: absolute;
    content: '';
    background: #ffd6dc;
    width: 15px;
    height: 15px;
    left: calc(50% - 7.5px);
    bottom: -7.5px;
    transform: rotate(45deg);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  opacity: 0;
  @media screen and (max-width: 768px) {
  }
`;

export const introMonitorBox = css`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 27vw;
  margin-top: 3rem;
  border: 4px solid black;
  border-radius: 8px;
  transform: translate3d(0, 0, 0);
  opacity: 0;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 1.5;
    height: 40vw;
  }
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
  animation: ${introMonitorBoxAniIn} 0.6s 0.5s forwards,
    ${introMonitorBoxAniOut} 1s 1.6s forwards;

  & > div:nth-child(1) {
    top: 0;
    left: 0;
    transform-origin: top left;
  }
  & > div:nth-child(2) {
    right: 0;
    transform-origin: top right;
  }
  & > div:nth-child(3) {
    left: 0;
    bottom: 0;
    transform-origin: bottom left;
  }
  & > div:nth-child(4) {
    right: 0;
    bottom: 0;
    transform-origin: bottom right;
  }
`;

export const introMonitorItem = (isClicked: boolean, clickItem: string) => css`
  position: absolute;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  z-index: ${isClicked ? `1` : `auto`};
  font-weight: 500;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  transition: 0.5s;
  transform: scale(${isClicked ? `2` : `1`});
  &:hover {
    color: rgba(255, 0, 0, 0.5);
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
    gap: 1rem;
  }
`;
export const introMonitorItemSvg = css`
  font-size: 4rem;
  @media screen and (min-width: 1024px) {
    font-size: 6rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const arrowDownSvg = css`
  position: absolute;
  left: calc(50% - 20px);
  bottom: -45px;
  width: 25px;
  height: 4px;
  background: black;
  border-radius: 2px;
  transform: rotate(45deg);
  &::after {
    position: absolute;
    content: '';
    bottom: 11px;
    left: 11px;
    width: 25px;
    height: 4px;
    background: black;
    border-radius: 4px;
    transform: rotate(90deg);
    box-shadow: 3px -1px 5px 1px rgb(0 0 0 / 0.2);
  }
  box-shadow: 3px 1px 5px 1px rgb(0 0 0 / 0.2);
`;
