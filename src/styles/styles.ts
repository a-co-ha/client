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

const introMonitorItemTopAni = keyframes`
  50% {
    top: -50%;
  }
  100% {
    opacity: 1;
    top: 0;
  }
`;
const introMonitorItemBottomAni = keyframes`
  50% {
    top: -25%;
  }
  100% {
    opacity: 1;
    bottom: 0;
  }
`;

export const flexRowCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const introSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const introSectionBox = css`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 35%;
  left: 50%;
  width: 55%;
  height: 50px;
  opacity: 1;
  transform: translate3d(-50%, -50%, 0);
  @media screen and (max-width: 340px) {
    width: 65%;
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
  user-select: none;
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
  z-index: 1;
  white-space: nowrap;
  opacity: 0;
  user-select: none;
  animation: ${mainTitleAni} 0.7s 2.3s forwards;
  @media screen and (max-width: 1280px) {
    font-size: 3.8rem;
    margin: 0;
  }
  @media screen and (max-width: 1150px) {
    font-size: 3.5rem;
    margin: 0;
  }
  @media screen and (max-width: 1024px) {
    font-size: 3rem;
    margin: 0;
  }
  @media screen and (max-width: 890px) {
    font-size: 2.5rem;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin: 0;
  }
  @media screen and (max-width: 640px) {
    font-size: 1.75rem;
    margin: 0;
  }
  @media screen and (max-width: 520px) {
    font-size: 1.5rem;
    margin: 0;
  }
`;

export const messages = css`
  z-index: 2;
  &:nth-of-type(4) {
  }
  &:nth-of-type(3) {
    transform: translate3d(-100%, 0, 0);
  }
  &:nth-of-type(4) {
    transform: translate3d(-100%, 0, 0);
  }
  &:nth-of-type(2) {
    opacity: 0;
  }
  &:nth-of-type(5) {
    opacity: 0;
  }
  &:nth-of-type(6) {
    opacity: 0;
  }
  &:nth-of-type(7) {
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
  border-radius: 1rem;
  border-top-left-radius: 0.2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
  @media screen and (max-width: 1024px) {
    height: 40vw;
  }
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
  animation: ${introMonitorBoxAniIn} 0.6s 0.5s forwards,
    ${introMonitorBoxAniOut} 1s 1.6s forwards;

  & > div:nth-of-type(1) {
    top: 50%;
    left: 0;
    opacity: 0;
    transform-origin: top left;
    animation: ${introMonitorItemTopAni} 0.8s 0.6s forwards;
  }
  & > div:nth-of-type(2) {
    top: 50%;
    right: 0;
    opacity: 0;
    transform-origin: top right;
    animation: ${introMonitorItemTopAni} 0.8s 0.65s forwards;
  }
  & > div:nth-of-type(3) {
    top: 50%;
    left: 0;
    bottom: 0;
    opacity: 0;
    transform-origin: bottom left;
    animation: ${introMonitorItemBottomAni} 0.8s 0.7s forwards;
  }
  & > div:nth-of-type(4) {
    top: 50%;
    right: 0;
    bottom: 0;
    opacity: 0;
    transform-origin: bottom right;
    animation: ${introMonitorItemBottomAni} 0.8s 0.75s forwards;
  }
`;

export const introMonitorItem = (isClicked: boolean) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  z-index: ${isClicked ? `1` : `auto`};
  font-size: 1rem;
  font-weight: 500;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  transition: 0.3s;
  transform: scale(${isClicked ? `2` : `1`});
  &:hover {
    color: rgba(255, 0, 0, 0.5);
  }
  @media screen and (min-width: 1024px) {
    gap: 1rem;
  }
  & > div:first-of-type {
    position: absolute;
    top: ${isClicked ? `20%` : `50%`};
    left: ${isClicked ? `15%` : `50%`};
    transition: 0.5s;
    transform: translate3d(-50%, -50%, 0) scale(${isClicked ? `0.5` : `1`});
    @media screen and (max-width: 420px) {
      transform: translate3d(-50%, -50%, 0) scale(${isClicked ? `0.4` : `1`});
    }
  }
`;

export const introMonitorItemSvgBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  user-select: none;
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 520px) {
    font-size: 0.8rem;
  }
`;

export const introMonitorItemSvgText = (isClicked: boolean) => css`
  transition: 0.2s;
  width: 90%;
  margin-top: 1rem;
  opacity: ${isClicked ? `1` : `0`};
  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  }
  @media screen and (max-width: 420px) {
    transform: scale(0.8);
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

export const introChatBox = css`
  display: flex;
  width: 100%;
  height: 470px;
  position: absolute;
  @media screen and (max-width: 1280px) {
    height: 470px;
  }
  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 768px) {
    height: 300px;
  }
  @media screen and (max-width: 520px) {
    height: 270px;
  }
  &::before {
    display: block;
    position: absolute;
    content: 'Chat';
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    font-weight: 600;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }
`;

export const introChatInnerBox = css`
  width: 100%;
`;

export const introChatImgBox = css`
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const introChatImg = css`
  max-width: unset;
  width: 150%;
`;

export const introChatImgReplyBox = css`
  position: absolute;
  bottom: 35%;
  right: 7%;
  width: 65%;
  padding: 0.2rem 0 0.2rem 0.5rem;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: start;
  background: #bddc95;
  border-radius: 0.7rem;
  border-top-right-radius: 0.2rem;
  white-space: pre-wrap;
  user-select: none;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 1280px) {
    font-size: 2.1rem;
    margin: 0;
  }
  @media screen and (max-width: 1150px) {
    font-size: 1.9rem;
    margin: 0;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    margin: 0;
  }
  @media screen and (max-width: 890px) {
    font-size: 1.35rem;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0;
  }
  @media screen and (max-width: 640px) {
    font-size: 1rem;
    margin: 0;
  }
  @media screen and (max-width: 520px) {
    font-size: 0.85rem;
    margin: 0;
  }
`;

export const mainItemSectionA = css`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #f1f1f2;
`;

export const mainItemSectionABox = css`
  width: 100%;
`;

export const mainItemPreviewBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const mainItemPreviewTitle = css`
  padding: 1rem;
  font-size: 2.5rem;
  font-weight: 900;
  white-space: pre-wrap;
`;

export const mainItemLayoutBox = css`
  display: flex;
  justify-content: center;
  position: relative;
  width: 55%;
  height: 50vh;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  @media screen and (min-width: 1280px) {
    height: 70vh;
  }
  @media screen and (max-width: 768px) {
    height: 50vh;
  }
  @media screen and (max-width: 520px) {
    overflow-x: scroll;
  }
  @media screen and (max-width: 340px) {
    width: 80%;
  }
`;

export const mainItemPreview = css`
  position: absolute;
  width: 90%;
  height: 100%;
  border: 0.5vw solid black;
  outline: 1.5px solid gray;
  border-radius: 2vw;
  transform: translate3d(0, 30%, 0);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    width: 130%;
    transform: translate3d(15%, 30%, 0);
  }
  @media screen and (max-width: 340px) {
    width: 150%;
    transform: translate3d(18%, 30%, 0);
  }
`;

export const previewNav = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8%;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 768px) {
    height: 6%;
  }
`;

export const previewNavAlert = css`
  margin-left: auto;
  margin-right: 0.5rem;
  width: 1.5vw;
`;

export const previewNavItemA = css`
  display: flex;
  align-items: center;
  width: 28%;
  height: 100%;
  font-size: 1vw;
  text-indent: 3vw;
  padding-inline: 1rem;
  white-space: nowrap;
  & span {
    margin-left: auto;
    width: 1.5vw;
  }
  box-shadow: 3px 0px 3px -3px rgb(0 0 0 / 0.1);
`;

export const previewNavItemB = css`
  display: flex;
  align-items: center;
  width: 17%;
  height: 100%;
  font-size: 1vw;
  padding-inline: 0.5rem;
  white-space: nowrap;
  & > div {
    display: flex;
    align-items: center;
    & > span:nth-of-type(2) {
      display: inline-block;
      font-size: 0.9vw;
      @media screen and (max-width: 768px) {
        transform: scale(0.8);
      }
      @media screen and (max-width: 520px) {
        transform: scale(0.7);
      }
    }
  }
  @media screen and (max-width: 340px) {
    padding-inline: 0rem;
  }
  box-shadow: -3px 0px 3px -3px rgb(0 0 0 / 0.1);
`;

export const previewNavItemBImg = css`
  display: inline-block;
  width: 2.5vw;
  height: 1.25vw;
  border-radius: 50%;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const previewSidebar = css`
  display: flex;
  height: 100%;
  & > div:nth-of-type(1) {
    width: 8%;
    height: 100%;
  }
  & > div:nth-of-type(2) {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 8px -4px rgb(0 0 0 / 0.2);
    width: 20%;
    height: 100%;
  }
  & > div:nth-of-type(3) {
    width: 55%;
    height: 100%;
  }
  & > div:nth-of-type(4) {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 8px -4px rgb(0 0 0 / 0.2);
    width: 17%;
    height: 30%;
  }
`;

export const previewList = css``;

export const previewChannelImgBox = css`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  gap: 0.3vw;
  overflow: hidden;
  width: 100%;
  &::before {
    display: block;
    position: absolute;
    content: '';
    top: 1.2vw;
    left: -0.3vw;
    width: calc(3vw / 5);
    height: 2vw;
    background: gray;
    border-radius: 1vw;
  }
  & img:nth-of-type(1) {
    margin-top: 1vw;
  }
  & img {
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 0.7vw;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  }
  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5vw;
    height: 2.5vw;
    font-size: 0.8rem;
    border: 0.1px solid black;
    border-radius: 0.7vw;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
    @media screen and (max-width: 520px) {
      font-size: 0.5rem;
    }
  }
`;

export const previewChannel = css``;

export const previewChannelMenuBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-inline: 1vw;
  margin-top: 5vw;
  font-size: 0.9vw;
`;

export const previewChannelMenu = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  font-weight: 500;
  & > div:nth-of-type(2) {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.7vw;
    padding: 0.5vw;
  }
  @media screen and (max-width: 768px) {
    & > div:nth-of-type(2) {
      transform: scale(0.9);
    }
  }
  @media screen and (max-width: 520px) {
    & > div:nth-of-type(2) {
      transform: scale(0.8);
    }
  }
`;

export const previewChannelMenuTab = css`
  display: flex;
  align-items: center;
  width: 100%;
  color: #6b279e;
  & > span:nth-of-type(1) {
    margin-left: auto;
    width: 1.1vw;
  }
  & > span:nth-of-type(2) {
    margin-left: 1vw;
  }
`;

export const previewMain = css`
  position: relative;
  display: flex;
`;

export const previewMainItemBox = css`
  display: flex;
  width: 100%;
`;

export const previewProgressBar = css`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.1vw;
  font-size: 0.9vw;
  & > span:nth-of-type(2) {
    font-size: 0.8vw;
    @media screen and (max-width: 520px) {
      transform: scale(0.8);
    }
  }
`;

export const previewProgressBarSpan = css`
  position: relative;
  width: 7vw;
  height: 0.7vw;
  background: white;
  border: 0.05vw solid rgb(255, 0, 0, 0.8);
  border-radius: 1vw;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    display: black;
    background: red;
    border-radius: 1vw;
  }
`;

export const previewProgressTabBox = css`
  padding: 2vw 1vw;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9vw;
`;

export const previewProgressTab = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: 0.9vw;
  & > h3:nth-of-type(1) {
    white-space: nowrap;
  }
  & > span:nth-of-type(1) {
    font-size: 0.7vw;
  }
  & > div:nth-of-type(1) {
    width: 100%;
    padding: 0.3vw;
    margin-bottom: 0.3vw;
    font-size: 0.7vw;
    color: rgba(0, 0, 0, 0.5);
    border: 0.05vw solid rgba(0, 0, 0, 0.5);
    border-radius: 0.4vw;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  }
  @media screen and (max-width: 768px) {
    & > div:nth-of-type(1),
    span:nth-of-type(1) {
      transform: scale(0.8);
    }
  }
  @media screen and (max-width: 520px) {
    & > div:nth-of-type(1),
    span:nth-of-type(1) {
      transform: scale(0.7);
    }
  }
  @media screen and (max-width: 340px) {
    & > h3:nth-of-type(1) {
      transform: scale(0.8);
    }
  }
`;

export const previewCommitLog = css`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 100%;
  font-size: 0.9vw;
  transform: translate3d(-25%, -50%, 0);
`;

export const previewCommitBox = css`
  width: 50%;
  height: 10vw;
  border-bottom-left-radius: 0.5vw;
  border-bottom-right-radius: 0.5vw;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 768px) {
    height: 15vw;
  }
  @media screen and (max-width: 520px) {
    height: 20vw;
  }
  @media screen and (max-width: 340px) {
    height: 25vw;
  }
`;

export const previewCommitLogTitle = css`
  display: flex;
  font-weight: 700;
  padding: 0.3vw;
  background: rgba(0, 0, 0, 0.3);
  border-top-left-radius: 0.5vw;
  border-top-right-radius: 0.5vw;
  & > img {
    width: 20px;
    height: 10px;
  }
  & > span {
    margin-left: 0.2vw;
    font-size: 0.7vw;
    @media screen and (max-width: 768px) {
      transform: scale(0.8);
    }
    @media screen and (max-width: 520px) {
      transform: scale(0.7);
    }
  }
`;

export const previewCommitLogContent = css`
  width: 100%;
  font-size: 0.8vw;
  font-weight: 500;

  & > span:nth-of-type(1),
  span:nth-of-type(2) {
    display: inline-block;
    width: 48%;
    padding: 0.3vw;
    margin: 0.1vw;
    text-align: center;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: 4px;
  }
  & > span:nth-of-type(1) {
    color: #3c66dd;
  }
  & > span:nth-of-type(2) {
    color: rgba(0, 0, 255, 0.2);
  }
`;

export const previewCommitLogBtnBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  font-size: 0.9vw;
  font-weight: 500;
  transform: translate3d(0, 75%, 0);
  @media screen and (max-width: 520px) {
    transform: translate3d(0, 55%, 0) scale(0.7);
  }
`;

export const previewCommitLogBtn = css`
  position: relative;
  font-size: 1vw;
  font-weight: 900;
  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 220%;
    height: 100%;
    border: 0.15vw solid black;
    border-radius: 0.3vw;
    transform: translate3d(-50%, -50%, 0);
  }
  @media screen and (max-width: 768px) {
    transform: scale(0.9);
  }
  @media screen and (max-width: 520px) {
    transform: scale(0.7);
  }
`;

export const previewUserList = css`
  height: 50%;
`;

export const previewUserBox = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1vw 0.3vw;
  font-size: 0.9vw;
  @media screen and (max-width: 520px) {
    padding: 0.3vw 0vw;
  }
`;

export const previewUser = css`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  padding: 0.2vw;
  &:nth-of-type(3) {
    & > span:nth-of-type(1) {
      background: gray;
    }
  }
  @media screen and (max-width: 768px) {
    transform: scale(0.8);
  }
  @media screen and (max-width: 520px) {
    transform: scale(0.6);
  }
`;

export const previewUserOn = css`
  width: 4px;
  height: 4px;
  background: limegreen;
  border-radius: 50%;
  margin-left: 0.5vw;
`;

export const previewBookmark = css`
  position: absolute;
  top: 40%;
  right: 0;
  width: 17%;
  height: 40%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.2);
`;

export const previewBookmarkContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8vw;

  & > div:nth-of-type(1) {
    text-align: center;
    width: 100%;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    & > div {
      @media screen and (max-width: 768px) {
        transform: scale(0.9);
      }
      @media screen and (max-width: 520px) {
        transform: scale(0.7);
      }
    }
  }
  & > div:nth-of-type(2) {
    margin-top: 1vw;
    @media screen and (max-width: 768px) {
      transform: scale(0.9);
    }
    @media screen and (max-width: 520px) {
      transform: scale(0.7);
    }
  }
`;
