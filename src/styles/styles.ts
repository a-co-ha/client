import { css, keyframes } from '@emotion/react';

//introSection Animation
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
// mainItemEditable Animation

const mainItemEditableAaniIn = keyframes`
  50% {
    opacity: 1;
    transform: translate3d(0,30%,0);
  }
  100% {
    opacity: .5;
    transform: translate3d(0,30%,0);
  }
`;

const mainItemEditableAaniOut = keyframes`
  to {
    transform: translate3d(-90%,30%,0);
  }
`;

const mainItemEditableAImgAni = keyframes`
  to {
    transform: translate3d(0%,-40%,0);
  }
`;

const mainItemEditableBani = keyframes`
  to {
    opacity: 1;
    transform: translate3d(15%,30%,0);
  }
`;

const itemAmediaAniIn = keyframes`
  50% {
    opacity: 1;
    transform: translate3d(0,20%,0) scale(0.8);
  }
  100% {
    opacity: .5;
    transform: translate3d(0,20%,0) scale(0.8);
  }
`;

const itemAmediaAniOut = keyframes`
  to {
    transform: translate3d(-90%,20%,0) scale(0.8);
  }
`;

const itemBmediaAni = keyframes`
  to {
    opacity: 1;
    transform: translate3d(5%,20%,0) scale(0.8);
  }
`;

const mainItemEditableBImgAni = keyframes`
  to {
    transform: translate3d(0%,-10%,0);
  }
`;

//mainItemChat Animation

const mainItemChatAani = keyframes`
to {
  opacity: 1;
  transform: translate3d(0,35%,0);
}`;

const chatOpacity = keyframes`
  to {
    opacity: 1;
  }
`;

const bookmarkBlingAni = keyframes`
  to {
    left: 200%;
  }
`;

const bookmarkToWhiteAni = keyframes`
  10% {
    background: white;
  }
  95% {
    background: white;
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  100% {
    background: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 8px -4px rgb(0 0 0 / 0.2);
  }
`;

const bookmarkToGrayAni = keyframes`
  to {
    background: transparent;
  }
`;

const mainItemChatBookmarkAaniIn = keyframes`
  to {
    opacity: 0.5;
    transform: translate3d(-97.5%,35%,0);
  }
`;

const mainItemChatBookmarkAaniOut = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,35%,0);
  }
`;

const mainItemChatBookmarkBaniIn = keyframes`
  to {
    opacity: 1;
    transform: translate3d(5%,35%,0);
  }
`;

const mainItemChatBookmarkBaniOut = keyframes`
  to {
    opacity: 0.5;
    transform: translate3d(110%,35%,0);
  }
`;

const bookmarkTitleAttrAni = keyframes`
  to {
    content: 'welcome acoha!';
    color: black;
  }
`;

const bookmarkContentAttrAni = keyframes`
  to {
    content: 'const acoha = \`welcome\`';
    color: black;
  }
`;

const bookmarkSubmitBlingAni = keyframes`
to {
  left: 200%;
}
`;

const bookmarkSubmitClickAni = keyframes`
 95% {
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  100% {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 8px -4px rgb(0 0 0 / 0.2);
  }
`;

const bookmarkAddAni = keyframes`
  49% {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  50% {
    opacity: 1;
    color: white;
    transform: translate3d(0,0,0);
  }
  100% {
    opacity: 1;
    color: black;
    transform: translate3d(0,0,0);
  }
`;

const bookmarkAddClickAni = keyframes`
  95% {
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  100% {
    box-shadow: none;
  }
`;

const bookmarkModalAni = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

// CommitLog Animation
const commitLogTranslateAniIn = keyframes`
to {
  transform: translate3d(-100%,0,0) scale(0.8);
  opacity: 0.3;
}
`;

const commitLogTranslateAniOut = keyframes`
to {
  transform: translate3d(-120%,0,0) scale(0.8);
  opacity: 0.3;
}
`;

const commitLogCommitAniIn = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,0,0) scale(1);
  }
`;

const commitLogCommitAniOut = keyframes`
  to {
    opacity: 0.5;
    transform: translate3d(-70%,0,0) scale(0.7);
  }
`;

const commitLogIssueAniIn = keyframes`
  to {
    transform: translate3d(73.5%,0,0) scale(0.7);
  }
`;

const commitLogIssueAniOut = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0%,0,0) scale(1);
  }
`;

// Progress Animation
const toLittleGrayBackground = keyframes`
  to {
    background: rgba(0,0,0,0.1);
  }
`;

const toGrayBackground = keyframes`
  to {
    background: rgba(0,0,0,0.2);
  }
`;

const textColorToWhite = keyframes`
  to {
    color: white;
    font-weight: 700;
  }
`;

const progressTodoTranslateAani = keyframes`
  to {
    transform: translate3d(116.5%,0,0)
  }
`;

const progressTodoTranslateBani = keyframes`
  to {
    transform: translate3d(233%,240%,0)
  }
`;

const progressProgressTranslateAni = keyframes`
  to {
    transform: translate3d(116.5%,120%,0);
  }
`;

const progressNewPostToTopAni = keyframes`
  to {
    transform: translate3d(0,-200%,0);
  }
`;

const progressNewPostToTopLastAni = keyframes`
  to {
    transform: translate3d(0,-200%,0);
  }
`;

const progressNewPostToBottomAni = keyframes`
  to {
    transform: translate3d(0,300%,0)
  }
`;
const progressNewPostToBottomLastAni = keyframes`
  to {
    transform: translate3d(0,650%,0)
  }
`;

const progressNewPostToBottomHalfAni = keyframes`
  to {
    transform: translate3d(0,0,0);
  }
`;

const progressBar66 = keyframes`
  to {
    width: 66%;
    background: #26b16e;
  }
`;

const progressBar100 = keyframes`
  to {
    width: 100%;
    background: #3a9ad2;
  }
`;

const progressBar66Span = keyframes`
  to {
    content: '66%';
  }
`;

const progressBar100Span = keyframes`
  to {
    content: '100%';
  }
`;

const mainItemProgressBani = keyframes`
  to {
    transform: translate3d(0,35%,0) scale(1) rotateX(0);
  }
`;

const progressSvgScaleAni = keyframes`
  to {
    transform: translate3d(0,0,0) scale(0.5);
  }
`;

const progressSvgTextScaleAni = keyframes`
  to {
    top: -120%;
    left: 0%;
  };
`;

const progressSvgOpacityAni = keyframes`
  to {
    opacity: 1;
  }
`;

const progressSvgStroke25Ani = keyframes`
  to {
    stroke-dashoffset: 330;
  }
`;

const progressSvgStroke33Ani = keyframes`
  to {
    stroke-dashoffset: 308;
  }
`;

const progressSvgStroke66Ani = keyframes`
  to {
    stroke-dashoffset: 150;
  }
`;

export const flexRowCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 10365px;
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
  @media screen and (max-width: 361px) {
    width: 70%;
  }
`;

export const mainTitleDesc = css`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
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
  @media screen and (min-width: 1024px) {
    gap: 1rem;
  }
  @media screen and (max-width: 361px) {
    & > div:first-of-type {
      transform: translate3d(-50%, -50%, 0) scale(${isClicked ? `0.3` : `0.9`});
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

const mainItemTitleStyle = css`
  padding: 1rem;
  margin: 2rem auto;
  font-size: 2.5rem;
  font-weight: 900;
  text-align: start;
  white-space: pre-wrap;
  word-break: keep-all;
  transition: 0.7s ease-out;
  @media screen and (max-width: 450px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 361px) {
    font-size: 2rem;
  }
`;

export const mainItemSectionA = css`
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgb(190, 192, 231);
  background: linear-gradient(
    90deg,
    rgba(190, 192, 231, 0.3) 0%,
    rgba(246, 203, 209, 0.5) 79%
  );
`;

export const mainItemSectionABox = css`
  width: 100%;
`;

export const mainItemPreviewBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & * {
    user-select: none;
  }
  padding-bottom: 8rem;
`;

export const mainItemPreviewTitle = css`
  ${mainItemTitleStyle};
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
    width: 80%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  @media screen and (max-width: 361px) {
    width: 80%;
  }
`;

export const mainItemLayoutInnerBox = css`
  width: 100%;
`;

export const mainItemPreviewScrollBoxTitle = css`
  position: relative;
  top: 5%;
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 0.4vh; 0;
  margin: 1vh auto 0;
  color: #3292b8;
  font-size: 1.25rem;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.375rem;
  transition: 0.7s ease-out;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  &:hover {
    transition: unset;
    color: #2f89ff;
  }
  @media screen and (max-width: 450px) {
    font-size: 2vh;
  }
  @media screen and (max-width: 361px) {
    font-size: 2vh;
    line-height:2vh;
  }
`;

export const mainItemPreviewScrollBox = css`
  position: relative;
  top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
`;

export const mainItemPreviewScrollArrowLeftBox = css`
  position: absolute;
  top: 50%;
  left: 15%;
  width: 30px;
  height: 30px;
  transform: translate3d(0, -50%, 0);
  cursor: pointer;
`;

export const mainItemPreviewScrollArrowLeft = css`
  position: absolute;
  top: 25%;
  left: 15%;
  width: 17px;
  height: 4px;
  background: black;
  border-radius: 2px;
  transform: translate3d(0, -50%, 0) rotate(-45deg);
  box-shadow: 0px 3px 5px 1px rgb(0 0 0 / 0.15);
  &::after {
    position: absolute;
    content: '';
    left: -50%;
    bottom: -180%;
    width: 18px;
    height: 4px;
    background: black;
    border-radius: 4px;
    transform: rotate(-90deg);
    box-shadow: -3px -2px 4px 1px rgb(0 0 0 / 0.15);
  }
`;

export const mainItemPreviewScrollArrowRightBox = css`
  position: absolute;
  top: 50%;
  right: 15%;
  width: 30px;
  height: 30px;
  transform: translate3d(0, -50%, 0);
  cursor: pointer;
`;

export const mainItemPreviewScrollArrowRight = css`
  position: absolute;
  top: 25%;
  right: 15%;
  width: 17px;
  height: 4px;
  background: black;
  border-radius: 2px;
  transform: translate3d(0, -50%, 0) rotate(45deg);
  box-shadow: 0px 3px 5px 1px rgb(0 0 0 / 0.15);
  &::after {
    position: absolute;
    content: '';
    right: -50%;
    bottom: -180%;
    width: 18px;
    height: 4px;
    background: black;
    border-radius: 4px;
    transform: rotate(90deg);
    box-shadow: 3px -2px 4px 1px rgb(0 0 0 / 0.15);
  }
`;

export const mainItemPreviewScrollItemBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  text-align: center;
  transform: translate3d(-50%, -50%, 0);
  transition: 0.5s;
  white-space: nowrap;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  @media screen and (max-width: 361px) {
    & > span {
      font-size: 1.2rem;
    }
  }
`;

const mainItemPreviewScrollItemClick = css`
  display: inline-block;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1vh;
  cursor: pointer;
  transition: 0.2s;
`;

export const mainItemPreviewScrollItemNav = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewNavName` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemAlert = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewNavAlert` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemChannelPlus = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewChannelPlus` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemPage = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewPage` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemProgress = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewProgressBar` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemCommitLog = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewCommitLog` ? `1.3` : `1`});
`;
export const mainItemPreviewScrollItemBookmark = (clickLabel: string) => css`
  ${mainItemPreviewScrollItemClick};
  transform: scale(${clickLabel === `previewBookmark` ? `1.3` : `1`});
`;

export const mainItemPreview = css`
  position: absolute;
  width: 90%;
  height: 100%;
  border: 0.5vh solid black;
  // outline: 1.5px solid gray;
  border-radius: 1.5vh;
  transition: 0.7s ease-out;
  transform: translate3d(0, 30%, 0);
  // overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    width: 130%;
  }
  @media screen and (max-width: 361px) {
    width: 150%;
  }
  & > * {
    background: rgba(0, 0, 0, 0.15);
  }
  &::before {
    position: absolute;
    content: '';
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border: 1.5px solid gray;
    border-radius: 1.7vh;
  }
`;

export const previewNav = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8%;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 768px) {
    height: 6%;
  }
`;

export const previewNavAlert = (clickLabel: string) => css`
  position: relative;
  margin-left: auto;
  margin-right: 0.5rem;
  width: 1.9vh;
  padding: 0.4vh;
  background: ${clickLabel === `previewNavAlert` ? `white` : `transparent`};
  border-radius: 0.375rem;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    width: 2.5vh;
  }
  &:hover {
    background: white;
  }
`;

export const previewNavAlertClick = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1vh;
  top: 120%;
  right: 0;
  width: 15vh;
  padding: 1vh;
  font-size: 1vh;
  z-index: 3;
  text-align: start;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  text-indent: 0;
  & > div > span {
    color: rgba(0, 0, 255, 0.8);
  }
  @media screen and (min-width: 1280px) {
    width: 20vh;
    font-size: 1.5vh;
  }
`;

export const previewNavItemA = (clickLabel: string) => css`
  position: relative;
  display: flex;
  align-items: center;
  width: 28%;
  height: 100%;
  font-size: 1vh;
  text-indent: 2vh;
  padding-inline: 1rem;
  border-top-left-radius: 1vh;
  background: ${clickLabel === `previewNavName` ? `white` : `transparent`};
  white-space: nowrap;
  cursor: pointer;
  & span {
    margin-left: auto;
    width: 1.5vh;
  }
  box-shadow: 3px 0px 3px -3px rgb(0 0 0 / 0.1);
  @media screen and (min-width: 1280px) {
    font-size: 1.5vh;
    & span {
      margin-left: auto;
      width: 2vh;
    }
  }
  &:hover {
    background: white;
  }
`;

export const previewNavName = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1vh;
  top: 120%;
  right: 0;
  width: 90%;
  padding: 1vh;
  z-index: 3;
  text-align: start;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  text-indent: 0;
  & > div:nth-of-type(3) {
    color: red;
  }
`;

export const previewNavItemB = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 17%;
  height: 100%;
  font-size: 1vh;
  padding-inline: 0.5rem;
  white-space: nowrap;
  & > div {
    display: flex;
    align-items: center;
    & > span:nth-of-type(2) {
      display: inline-block;
      font-size: 0.9vh;
      @media screen and (max-width: 768px) {
        transform: scale(0.8);
      }
      @media screen and (max-width: 520px) {
        transform: scale(0.7);
      }
    }
  }
  @media screen and (min-width: 1280px) {
    & > div {
      display: flex;
      align-items: center;
      & > span:nth-of-type(1) {
        width: 4.5vh;
        height: 2.5vh;
      }
      & > span:nth-of-type(2) {
        font-size: 1.5vh;
      }
    }
  }
  @media screen and (max-width: 361px) {
    padding-inline: 0rem;
  }
  box-shadow: -3px 0px 3px -3px rgb(0 0 0 / 0.1);
`;

export const previewNavItemBImg = css`
  display: inline-block;
  width: 2.5vh;
  height: 1.25vh;
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

export const previewChannelImgBox = (clickLabel: string) => css`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  gap: 0.3vh;
  overflow: hidden;
  width: 100%;
  &::before {
    display: block;
    position: absolute;
    content: '';
    top: 1.2vh;
    left: -0.3vh;
    width: calc(3vh / 5);
    height: 2vh;
    background: gray;
    border-radius: 1vh;
  }
  & > img:nth-of-type(1) {
    margin-top: 1vh;
  }
  & > img {
    position: relative;
    width: 2.5vh;
    height: 2.5vh;
    border-radius: 0.7vh;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  }
  & > div:nth-of-type(1) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5vh;
    height: 2.5vh;
    font-size: 0.8rem;
    background: ${clickLabel === `previewChannelPlus`
      ? `white`
      : `transparent`};
    border: 0.1px solid black;
    border-radius: 0.7vh;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
    cursor: pointer;
    &:hover {
      background: white;
    }
    @media screen and (max-width: 520px) {
      font-size: 0.5rem;
    }
  }
  @media screen and (min-width: 1280px) {
    & > img,
    & > div:nth-of-type(1) {
      width: 3.5vh;
      height: 3.5vh;
    }
    &::before {
      top: 1.3vh;
      width: calc(3.5vh / 5);
      height: 3vh;
    }
  }
`;

export const previewChannelImgPlus = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  width: 50%;
  height: 20%;
  z-index: 3;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  transform: translate3d(-50%, -35%, 0);
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1vh;
    width: 80%;
    font-size: 1vh;
    @media screen and (min-width: 1280px) {
      font-size: 2vh;
    }
  }
  & > div > input {
    text-align: center;
    width: 100%;
    padding: 0.3vh;
    font-size: 1vh;
    border: 0.1px solid black;
    border-radius: 0.2rem;
  }
`;

export const previewChannel = css``;

export const previewChannelMenuBox = css`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  align-items: center;
  width: 100%;
  padding-inline: 1vh;
  margin-top: 5vh;
  font-size: 0.9vh;
  @media screen and (min-width: 1280px) {
    font-size: 1.5vh;
  }
`;

export const previewChannelMenu = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  font-weight: 500;
  & > div:nth-of-type(2) {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.7vh;
    padding: 0.5vh;
  }
  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(2) {
      font-size: 1.3vh;
    }
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
export const previewChannelMenuTab = (clickLabel: string) => css`
  display: flex;
  align-items: center;
  width: 100%;
  color: #6b279e;
  & > span:nth-of-type(1) {
    margin-left: auto;
    width: 1.1vh;
  }
  & > span:nth-of-type(2) {
    position: relative;
    padding: 0.1vh 0.3vh;
    margin-left: 1vh;
    text-align: center;
    background: ${clickLabel === `previewPage` ? `white` : `transparent`};
    border-radius: 0.375rem;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
  @media screen and (min-width: 1280px) {
    & > span:nth-of-type(1),
    span:nth-of-type(2) {
      width: 2vh;
    }
    & > span:nth-of-type(2) {
      margin-left: 1.5vh;
    }
  }
`;

export const previewChannelMenuTabClick = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1vh;
  top: 0;
  left: 150%;
  width: 20vh;
  padding: 1vh;
  color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  background: white;
  border-radius: 0.375rem;
  & > div {
    display: flex;
    gap: 1vh;
    width: 100%;
    text-align: start;
    & > div {
      width: 70%;
      & > h3 {
        font-size: 0.9vh;
        color: black;
      }
      & > span {
        font-size: 0.9vh;
      }
    }
  }
  & > div > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5vh;
    height: 2.5vh;
    background: #75b4af;
    border-radius: 4px;
    & > svg {
      width: 1.5vh;
      color: white;
      background: transparent;
    }
  }
  @media screen and (min-width: 1280px) {
    width: 25vh;
    padding: 2vh;
  }
  @media screen and (max-width: 768px) {
    & > div {
      transform: scale(0.8);
    }
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

export const previewProgressBar = (clickLabel: string) => css`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.1vh;
  font-size: 0.9vh;
  background: ${clickLabel === `previewProgressBar` ? `wthie` : `transparent`};
  border-radius: 0.2rem;
  cursor: pointer;
  & > span:nth-of-type(2) {
    font-size: 0.8vh;
    @media screen and (max-width: 520px) {
      transform: scale(0.8);
    }
  }
  &:hover {
    background: white;
  }
  &:hover + div > div > div {
    background: white;
  }
  @media screen and (min-width: 1280px) {
    & > span:nth-of-type(2) {
      font-size: 1.5vh;
    }
  }
`;

export const previewProgressBarClick = css`
  position: absolute;
  gap: 1vh;
  top: 100%;
  right: 0;
  width: 20vh;
  padding: 1vh;
  font-size: 0.9vh;
  color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  & > span {
    color: rgba(0, 0, 255, 0.8);
  }
  @media screen and (min-width: 1280px) {
    width: 25vh;
    font-size: 1.5vh;
  }
`;

export const previewProgressBarSpan = css`
  position: relative;
  width: 7vh;
  height: 0.7vh;
  border: 0.05vh solid rgb(0, 0, 0, 0.8);
  border-radius: 1vh;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    display: black;
    background: #f19c49;
    border-radius: 1vh;
  }
  @media screen and (min-width: 1280px) {
    width: 10vh;
    height: 1vh;
  }
`;

export const previewProgressTabBox = css`
  padding: 2vh 1vh;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9vh;
  & > div:nth-of-type(1) {
    & > h3 {
      background: #d1b75d;
    }
  }
  & > div:nth-of-type(2) {
    & > h3 {
      background: #a8d6c8;
    }
  }
  & > div:nth-of-type(3) {
    & > h3 {
      background: #86bcde;
    }
  }
  @media screen and (min-width: 1280px) {
    padding: 4vh 2vh;
  }
`;

export const previewProgressTab = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: 0.9vh;
  & > h3:nth-of-type(1) {
    width: fit-content;
    padding: 0.2rem;
    white-space: nowrap;
    border-radius: 4px;
  }
  & > span:nth-of-type(1) {
    font-size: 0.7vh;
  }
  & > div:nth-of-type(1) {
    width: 100%;
    padding: 0.3vh;
    margin-bottom: 0.3vh;
    font-size: 0.7vh;
    color: rgba(0, 0, 0, 0.5);
    border: 0.05vh solid rgba(0, 0, 0, 0.5);
    border-radius: 0.4vh;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  }
  @media screen and (min-width: 1280px) {
    font-size: 1.5vh;
    & > span:nth-of-type(1) {
      font-size: 1.2vh;
    }
    & > div:nth-of-type(1) {
      font-size: 1.2vh;
      padding: 1vh;
    }
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
  @media screen and (max-width: 361px) {
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
  font-size: 0.9vh;
  transform: translate3d(-50%, -40%, 0);
`;

export const previewCommitLogClick = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: -10%;
  left: 30%;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  transform: translate3d(-50%, -35%, 0);
  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    width: 100%;
    font-size: 0.9vh;
    @media screen and (min-width: 1280px) {
      font-size: 1.5vh;
      padding-bottom: 1vh;
    }
    & > span {
      padding: 0.3vh;
      border-radius: 0.1rem;
      box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2),
        0 -2px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    }
    & > span:nth-of-type(1) {
      background: rgba(255, 0, 0, 0.8);
      color: white;
    }
    & > span:nth-of-type(3) > svg {
      width: 1vh;
      height: 1vh;
      @media screen and (min-width: 1280px) {
        width: 1.5vh;
        height: 1.5vh;
      }
    }
  }
  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1vh;
    width: 100%;
    height: 60%;
    & > span {
      font-size: 1vh;
    }
  }
  & > div:nth-of-type(3) {
    text-align: center;
    width: 90%;
    padding: 0.3vh;
    font-size: 1vh;
    color: white;
    background: rgba(248, 93, 117, 1);
    border-radius: 0.1rem;
  }
  @media screen and (max-width: 768px) {
    & > div:nth-of-type(1) {
      transform: scale(0.8);
    }
    & > div:nth-of-type(2) {
      transform: scale(0.8);
    }
    & > div:nth-of-type(3) {
      transform: scale(0.8);
    }
  }
`;

export const previewCommitBox = (clickLabel: string) => css`
  position: absolute;
  left: 50%;
  width: 50%;
  height: 20vh;
  background: ${clickLabel === `previewCommitLog` ? `white` : `transparent`};
  border-radius: 0.5vh;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  transform: translate3d(-50%, -40%, 0);
  cursor: pointer;
  &:hover {
    background: white;
  }
  @media screen and (max-width: 768px) {
    height: 15vh;
  }
`;

export const previewCommitLogTitle = css`
  display: flex;
  font-weight: 700;
  padding: 0.3vh;
  background: rgba(0, 0, 0, 0.3);
  border-top-left-radius: 0.5vh;
  border-top-right-radius: 0.5vh;
  & > img {
    width: 20px;
    height: 10px;
  }
  & > span {
    margin-left: 0.2vh;
    font-size: 0.7vh;
    @media screen and (max-width: 768px) {
      transform: scale(0.8);
    }
    @media screen and (max-width: 520px) {
      transform: scale(0.7);
    }
  }
  @media screen and (min-width: 1280px) {
    & > img {
      width: 30px;
      height: 15px;
    }
    & > span {
      font-size: 1.5vh;
    }
  }
`;

export const previewCommitLogContent = css`
  position: relative;
  width: 100%;
  font-size: 0.8vh;
  font-weight: 500;

  & > span:nth-of-type(1),
  span:nth-of-type(2) {
    display: inline-block;
    width: 48%;
    padding: 0.3vh;
    margin: 0.1vh;
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
  @media screen and (min-width: 1280px) {
    font-size: 1.5vh;
    & > span:nth-of-type(1),
    span:nth-of-type(2) {
      padding: 0.6vh;
    }
  }
`;

export const previewCommitLogBtnBox = css`
  position: absolute;
  top: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5vh;
  font-size: 1.5vh;
  font-weight: 500;
  transform: translate3d(-50%, -40%, 0);
  & > span:nth-of-type(2) {
    white-space: nowrap;
  }
  @media screen and (max-width: 1280px) {
    font-size: 0.9vh;
  }
  @media screen and (max-width: 520px) {
    scale(0.7);
  }
`;

export const previewCommitLogBtn = css`
  position: relative;
  font-size: 1vh;
  font-weight: 900;
  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 220%;
    height: 100%;
    border: 0.15vh solid black;
    border-radius: 0.3vh;
    transform: translate3d(-50%, -50%, 0);
  }

  @media screen and (min-width: 1280px) {
    &::before {
      width: 230%;
    }
    font-size: 2vh;
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
  padding: 1vh 0.3vw;
  font-size: 0.9vh;
  @media screen and (min-width: 1280px) {
    padding: 1vh 1vh;
    font-size: 1.5vh;
  }
  @media screen and (max-width: 520px) {
    padding: 0.3vh 0vh;
  }
`;

export const previewUser = css`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  padding: 0.2vh;
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
  margin-left: 0.5vh;
`;

export const previewBookmark = css`
  position: absolute;
  top: 40%;
  right: 0;
  width: 17%;
  height: 40%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.2);
`;

export const previewBookmarkContent = (clickLabel: string) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8vh;
  & > div:nth-of-type(1) {
    text-align: center;
    font-weight: 500;
    width: 100%;
    padding: 0.5vh 1vh;
    background: ${clickLabel === `previewBookmark` ? `white` : `transparent`};
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    cursor: pointer;
    &:hover {
      background: white;
    }
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
    margin-top: 1vh;
    @media screen and (max-width: 768px) {
      transform: scale(0.9);
    }
    @media screen and (max-width: 520px) {
      transform: scale(0.7);
    }
  }
  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      font-size: 1.5vh;
    }
    & > div:nth-of-type(2) {
      font-size: 1.2vh;
    }
  }
`;

export const previewBookmarkContentClick = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5vh;
  position: fixed;
  top: 30%;
  left: 50%;
  width: 40%;
  height: 15%;
  padding: 1vh;
  z-index: 3;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  transform: translate3d(-50%, -30%, 0);
  cursor: pointer;
  & > h3 {
    margin-right: auto;
  }
  & > span {
    margin-right: auto;
  }
  & > div {
    width: 100%;
    display: flex;
  }
  & > div > span {
    padding: 0.5vh;
    background: rgb(219 234 254);
    border-radius: 4px;
  }
  & > div > div {
    margin-left: auto;
    & > span:nth-of-type(1),
    span:nth-of-type(2) {
      display: inline-block;
      padding: 0.5vh;
      border-radius: 4px;
    }
    & > span:nth-of-type(1) {
      margin-right: 0.5vh;
      background: rgba(0, 0, 0, 0.1);
    }
    & > span:nth-of-type(2) {
      margin-right: 0.5vh;
      color: white;
      background: rgba(255, 0, 0, 0.5);
    }
  }
  @media screen and (min-width: 1280px) {
    font-size: 1.5vh;
  }
  @media screen and (max-width: 768px) {
    & < * {
      transform: scale(0.9);
    }
    left: 35%;
  }
  @media screen and (max-width: 520px) {
    & < * {
      transform: scale(0.8);
    }
    left: 35%;
  }
`;

const mainItemEditableStyle = css`
  position: absolute;
  width: 70%;
  height: 100%;
  border-radius: 1.7vh;
  background: rgba(0, 0, 0, 0.4);
  transition: 0.7s ease-out;
  transform: translate3d(0, 30%, 0);
  overflow: hidden;
  box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
    2px 4px 8px -4px rgb(0 0 0 / 0.2);
  @media screen and (max-width: 1280px) {
    width: 70%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    width: 130%;
  }
  @media screen and (max-width: 361px) {
    width: 150%;
  }
`;

export const mainItemEditableBox = css`
  ${mainItemPreviewBox};
  background: white;
`;

export const mainItemEditableTitle = css`
  ${mainItemTitleStyle};
`;

export const mainItemEditableSubTitle = css`
  ${mainItemPreviewScrollBoxTitle};
`;

export const mainItemEditableLayoutBox = css`
  ${mainItemLayoutBox};
  background: #f1f1f2;
  box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
    2px 4px 8px -4px rgb(0 0 0 / 0.2);
`;

export const mainItemEditableLayoutInnerBox = css`
  width: 100%;
`;

export const mainItemEditableDescBox = css`
  ${mainItemPreviewScrollBox};
  width: 90%;
  margin: 0 auto;
  transition: 0.7s ease-out;
  text-align: center;
  & > h3 {
    width: 60%;
  }
  & > h3 > span {
    font-weight: 500;
  }
  @media screen and (min-width: 1280px) {
    font-size: 2.5vh;
  }
  @media screen and (max-width: 361px) {
    font-size: 1.8vh;
  }
`;

export const mainItemEditableA = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  background: white;
  border-radius: 2.5vh;
  opacity: 0;
  transform: translate3d(0, 60%, 0);
  -webkit-animation: ${isAni ? mainItemEditableAaniIn : null} 3s forwards,
    ${isAni ? mainItemEditableAaniOut : null} 1.5s 3s forwards;
  & > img {
    animation: ${isAni ? mainItemEditableAImgAni : null} 1s 1.5s forwards;
  }
  @media screen and (max-width: 580px) {
    transform: translate3d(0, 60%, 0) scale(0.8);
    -webkit-animation: ${isAni ? itemAmediaAniIn : null} 3s forwards,
      ${isAni ? itemAmediaAniOut : null} 1.5s 3s forwards;
    & > img {
      animation: ${isAni ? mainItemEditableAImgAni : null} 1s 1.5s forwards;
    }
  }
  @media screen and (max-width: 361px) {
    width: 130%;
  }
`;

export const mainItemEditableB = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  background: white;
  opacity: 0;
  transform: translate3d(15%, 45%, 0);
  animation: ${isAni ? mainItemEditableBani : null} 1s 3.6s forwards;
  & > img {
    object-fit: contain;
    animation: ${isAni ? mainItemEditableBImgAni : null} 1s 4.5s forwards;
  }
  @media screen and (max-width: 580px) {
    transform: translate3d(5%, 45%, 0) scale(0.8);
    animation: ${isAni ? itemBmediaAni : null} 1s 3.6s forwards;
    & > img {
      object-fit: contain;
      animation: null;
    }
  }
  @media screen and (max-width: 361px) {
    width: 130%;
  }
`;

export const mainItemChatBox = css`
  ${mainItemPreviewBox};
  background: rgb(246, 203, 209);
  background: linear-gradient(
    90deg,
    rgba(246, 203, 209, 1) 0%,
    rgba(254, 251, 227, 1) 81%
  );
  & > div:nth-of-type(2) {
    margin-top: 1.5rem;
  }
`;

export const mainItemChatTitle = css`
  ${mainItemTitleStyle};
  @media screen and (max-width: 361px) {
    font-size: 1.9rem;
  }
`;

export const mainItemChatSubTitle = css`
  ${mainItemPreviewScrollBoxTitle};
`;

export const mainItemChatLayoutBox = css`
  ${mainItemLayoutBox};
  background: #f1f1f2;
  transition: 0.7s ease-out;
`;

export const mainItemChatLayoutInnerBox = css`
  width: 100%;
`;

export const mainItemChatDescBox = css`
  ${mainItemPreviewScrollBox};
  width: 90%;
  margin: 0 auto;
  text-align: center;
  & > h3 {
    width: 70%;
  }
  transition: 0.7s ease-out;
  & > h3 > span {
    font-weight: 500;
  }
  @media screen and (min-width: 1280px) {
    font-size: 2.5vh;
  }
  @media screen and (max-width: 361px) {
    font-size: 1.8vh;
  }
`;

export const mainItemChatA = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  background: white;
  box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
    2px 4px 8px -4px rgb(0 0 0 / 0.2);
  opacity: 0;
  transform: translate3d(0, 60%, 0);
  animation: ${isAni ? mainItemChatAani : null} 1.5s forwards;
  & > div:nth-of-type(1) {
    opacity: 0;
    animation: ${isAni ? chatOpacity : null} 0.1s 1.6s forwards;
  }
  & > div:nth-of-type(2) {
    padding-top: 0;
    opacity: 0;
    transform: translate3d(0, -30%, 0);
    animation: ${isAni ? chatOpacity : null} 0.1s 2.2s forwards;
    & > div:nth-of-type(1) {
      opacity: 0;
    }
    & > div:nth-of-type(2) > div {
      opacity: 0;
    }
    & > div:nth-of-type(2) > span {
      padding: 1rem;
    }
  }
  & > div:nth-of-type(3) {
    opacity: 0;
    animation: ${isAni ? chatOpacity : null} 0.1s 2.8s forwards;
    & > div:nth-of-type(2) > span {
      background: #ffd6dc;
    }
  }
  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      padding
    }
  }
  @media screen and (max-width: 361px) {
    width: 100%;
     & > div:nth-of-type(3) {
        padding-top: 0;
     }
  }
`;

export const mainItemChatAInnerBox = css`
  display: flex;
  padding: 1rem;
  @media screen and (min-width: 1280px) {
    padding-top: 2rem;
  }
  @media screen and (max-width: 450px) {
    padding-left: 3.5rem;
  }
`;

export const mainItemChatImageBoxA = css`
  position: absolute;
  width: 4.5vh;
  height: 4.5vh;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (min-width: 1280px) {
    width: 5.5vh;
    height: 5.5vh;
  }
`;

export const mainItemChatMessageBox = css`
  display: flex;
  flex-direction: column;
  margin-left: 2.7rem;
  line-height: 2vh;
  & > div > span:nth-of-type(1) {
    font-size: 1.5vh;
  }
  & > div > span:nth-of-type(2) {
    font-size: 1.5vh;
    color: gray;
    margin-left: 0.25rem;
  }
  & > span:nth-of-type(1) {
    width: fit-content;
    padding: 1vh;
    font-size: 1.7vh;
    font-weight: 500;
    background: #bddc95;
    border-radius: 0.8rem;
    border-top-left-radius: 4px;
    box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
      2px 4px 8px -4px rgb(0 0 0 / 0.2);
  }
  @media screen and (min-width: 1280px) {
    margin-left: 3.5rem;
    & > span:nth-of-type(1) {
      padding: 2vh;
      font-size: 2.5vh;
    }
    & > div > span:nth-of-type(1) {
      font-size: 1.75vh;
    }
    & > div > span:nth-of-type(2) {
      font-size: 1.75vh;
      color: gray;
      margin-left: 0.5rem;
    }
  }
`;

export const mainItemChatMessageCode = css`
  padding: 1vh;
  color: #3c89da;
  background: #f3f3f3;
  border-radius: 0.5vh;
  & > i {
    color: gray;
    padding-right: 1vh;
  }
  & > span:nth-of-type(1) {
    color: #c443f9;
  }
  & > span:nth-of-type(2) {
    color: black;
  }
  & > span:nth-of-type(3) {
    color: #7fb37e;
  }
  @media screen and (max-width: 361px) {
    font-size: 0.7rem;
  }
`;

export const mainItemChatBookmarkA = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  background: white;
  transform: translate3d(0, 35%, 0);
  animation: ${isAni ? mainItemChatBookmarkAaniIn : null} 1.5s 2.7s forwards,
    ${isAni ? mainItemChatBookmarkAaniOut : null} 1.5s 6.7s forwards;
  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    background: rgba(0, 0, 0, 0.1);
    & > div:nth-of-type(1) {
      width: 50%;
      height: 100%;
      transform: translate3d(0, 20%, 0);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 8px -4px rgb(0 0 0 / 0.2);
      & > div:nth-of-type(1) {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15%;
        font-weight: 500;
        background: inherit;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 8px -4px rgb(0 0 0 / 0.2);
        overflow: hidden;
        animation: ${isAni ? bookmarkToWhiteAni : null} 0.2s 2s forwards,
          ${isAni ? bookmarkToGrayAni : null} 0.2s 4s forwards;
        &::before {
          position: absolute;
          content: '';
          top: -50%;
          left: -30%;
          width: 2%;
          height: 200%;
          z-index: 3;
          background: white;
          transform: rotate(45deg);
          animation: ${isAni ? bookmarkBlingAni : null} 2s 1s forwards;
        }
        &::after {
          position: absolute;
          content: '';
          top: -50%;
          left: -20%;
          width: 5%;
          height: 200%;
          z-index: 3;
          background: white;
          transform: rotate(45deg);
          animation: ${isAni ? bookmarkBlingAni : null} 2s 1s forwards;
        }
      }
      & > div:nth-of-type(2) {
        padding: 1rem 0;
        & > div:nth-of-type(1),
        div:nth-of-type(2),
        div:nth-of-type(3) {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          font-size: 1.7vh;
          color: gray;
        }
        & > div:nth-of-type(3) {
          color: white;
          opacity: 0;
          background: white;
          transform: translate3d(0, -310%, 0);
          animation: ${isAni ? bookmarkAddAni : null} 2s 8s forwards,
            ${isAni ? bookmarkAddClickAni : null} 0.2s 9.8s forwards;
        }
      }
    }
    & > div:nth-of-type(2) {
      position: absolute;
      z-index: 4;
      width: 80%;
      height: 40%;
      padding: 1rem;
      background: white;
      border-radius: 1.5vh;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 8px -4px rgb(0 0 0 / 0.2);
      opacity: 0;
      transform: translate3d(0, 25%, 0);
      animation: ${isAni ? bookmarkModalAni : null} 1s 10.5s forwards;
      & > h3 {
        height: 15%;
        margin-right: auto;
        font-size: 2.5vh;
      }
      & > span {
        display: flex;
        align-items: center;
        height: 70%;
        margin-right: auto;
        & > span {
          width: 100%;
        }
      }
      & > div {
        width: 100%;
        height: 15%;
      }
      & > div > div:nth-of-type(1) {
        display: flex;
        & > span:nth-of-type(1) {
          display: inline-block;
          padding: 0.5vh;
          margin-right: auto;
          background: rgb(219 234 254);
          border-radius: 4px;
          box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
            2px 4px 8px -4px rgb(0 0 0 / 0.2);
        }
        & > span:nth-of-type(2),
        span:nth-of-type(3) {
          display: inline-block;
          padding: 0.5vh;
          border-radius: 4px;
        }
        & > span:nth-of-type(2) {
          margin-right: 0.5vh;
          background: rgba(0, 0, 0, 0.1);
          box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
            2px 4px 8px -4px rgb(0 0 0 / 0.2);
        }
        & > span:nth-of-type(3) {
          margin-right: 0.5vh;
          color: white;
          background: rgba(255, 0, 0, 0.5);
          box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.2),
            2px 4px 8px -4px rgb(0 0 0 / 0.2);
        }
      }
    }
  }

  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      & > div:nth-of-type(1) {
        & > div:nth-of-type(2) {
          & > div:nth-of-type(1),
          div:nth-of-type(2),
          div:nth-of-type(3) {
            padding: 1rem 2rem;
          }
        }
      }
      & > div:nth-of-type(2) {
        & > h3 {
          font-size: 3.5vh;
        }
        & > div > div:nth-of-type(1) {
          font-size: 2vh;
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    & > div:nth-of-type(1) {
      & > div:nth-of-type(2) {
        width: 70%;
        & > div > div:nth-of-type(1) {
          font-size: 0.9rem;
        }
      }
    }
  }
  @media screen and (max-width: 361px) {
    & > div:nth-of-type(1) {
      & > div:nth-of-type(2) {
        width: 60%;
        & > div > div:nth-of-type(1) {
          font-size: 0.7rem;
        }
      }
    }
  }
`;

export const mainItemChatBookmarkB = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  background: white;
  opacity: 0.5;
  transform: translate3d(110%, 35%, 0);
  animation: ${isAni ? mainItemChatBookmarkBaniIn : null} 1.5s 2.7s forwards,
    ${isAni ? mainItemChatBookmarkBaniOut : null} 1.5s 6.7s forwards;
  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 80%;
      height: 70%;
      padding: 1rem;
      background: white;
      border-radius: 1.5vh;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 8px -4px rgb(0 0 0 / 0.2);
      & > div:nth-of-type(1) {
        position: relative;
        height: 15%;
        color: gray;
        border-bottom: 0.1px solid gray;
        &::before {
          position: absolute;
          content: attr(aria-label);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: ${isAni ? bookmarkTitleAttrAni : null} 1s 4s forwards;
        }
      }
      & > div:nth-of-type(2) {
        position: relative;
        height: calc(70% - 1rem);
        margin-top: 1rem;
        color: gray;
        &::before {
          position: absolute;
          content: attr(aria-label);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: ${isAni ? bookmarkContentAttrAni : null} 1s 4.5s forwards;
        }
      }
      & > div:nth-of-type(3) {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15%;
        box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2),
          0 -2px 3px -3px rgb(0 0 0 / 0.2), 0 2px 6px -4px rgb(0 0 0 / 0.2);
        overflow: hidden;
        animation: ${isAni ? bookmarkSubmitClickAni : null} 0.2s 5.7s forwards;
        &::after {
          position: absolute;
          content: '';
          top: -50%;
          left: -20%;
          width: 5%;
          height: 200%;
          z-index: 3;
          background: white;
          transform: rotate(45deg);
          animation: ${isAni ? bookmarkSubmitBlingAni : null} 2s 4.8s forwards;
        }
        & > svg {
          width: 2vh;
          height: 2vh;
        }
      }
    }
  }

  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      & > div {
        & > div:nth-of-type(1) {
          &::before {
            font-size: 2.5vh;
          }
        }
        & > div:nth-of-type(2) {
          &::before {
            font-size: 2.5vh;
          }
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    & > div:nth-of-type(1) {
      & > div {
        width: 60%;
        transform: translate3d(-8%, 0, 0);
      }
    }
  }
  @media screen and (max-width: 361px) {
    & > div:nth-of-type(1) {
      & > div {
        width: 60%;
        transform: translate3d(-8%, 0, 0);
      }
    }
  }
`;

export const mainItemCommitLogBox = css`
  ${mainItemPreviewBox};
  background: white;
`;

export const mainItemCommitLogLayoutBox = css`
  ${mainItemLayoutBox};
  background: #f1f1f2;
`;

export const mainItemCommitLogLayoutInnerBox = css`
  width: 100%;
`;

export const mainItemCommitLogTitle = css`
  ${mainItemTitleStyle};

  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 450px) {
    width: 75%;
  }
  @media screen and (max-width: 361px) {
    width: 85%;
    font-size: 1.9rem;
  }
`;

export const mainItemCommitLogSubTitle = css`
  ${mainItemPreviewScrollBoxTitle};
`;

export const mainItemCommitLogDescBox = css`
  ${mainItemPreviewScrollBox};
  width: 90%;
  margin: 0 auto;
  text-align: center;
  transition: 0.7s ease-out;
  & > h3 {
    width: 70%;
    word-break: keep-all;
  }
  & > h3 > span {
    font-weight: 500;
  }
  @media screen and (min-width: 1280px) {
    font-size: 2.5vh;
  }
  @media screen and (max-width: 361px) {
    font-size: 1.8vh;
  }
`;

export const mainItemCommitLogA = css`
  ${mainItemEditableStyle};
  background: white;
  transform: translate3d(0, 35%, 0);
  & > div:nth-of-type(1) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    background: rgba(0, 0, 0, 0.1);
`;

export const mainItemCommitLogConnectBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 70%;
  transform: translate3d(-50%, -50%, 0);
`;

export const mainItemCommitLogConnectInnerBox = (isAni: boolean) => css`
  position: absolute;
  width: 50%;
  height: 100%;
  background: white;
  border-radius: 0.5vh;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  transform: translate3d(50%, 0, 0);
  overflow: hidden;
  animation: ${isAni ? bookmarkSubmitClickAni : null} 0.2s 1.5s forwards,
    ${isAni ? commitLogTranslateAniIn : null} 1.5s 2.3s forwards,
    ${isAni ? commitLogTranslateAniOut : null} 1.5s 5.15s forwards;
  &::before {
    position: absolute;
    content: '';
    top: -50%;
    left: -80%;
    width: 2%;
    height: 200%;
    z-index: 3;
    background: white;
    transform: rotate(45deg);
    animation: ${isAni ? bookmarkBlingAni : null} 0.5s 1s forwards;
  }
  &::after {
    position: absolute;
    content: '';
    top: -50%;
    left: -70%;
    width: 5%;
    height: 200%;
    z-index: 3;
    background: white;
    transform: rotate(45deg);
    animation: ${isAni ? bookmarkBlingAni : null} 0.5s 1s forwards;
  }
`;

export const mainItemCommitLogConnectTitle = css`
  ${previewCommitLogTitle};
`;

export const mainItemCommitLogContent = css`
  ${previewCommitLogContent};
`;

export const mainItemCommitLogBtnBox = css`
  ${previewCommitLogBtnBox};
`;

export const mainItemCommitLogBtn = css`
  ${previewCommitLogBtn};
`;

export const mainItemCommitLogImageBox = (isAni: boolean) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translate3d(100%, 0, 0) scale(0.7);
  animation: ${isAni ? commitLogCommitAniIn : null} 1.5s 2.2s forwards,
    ${isAni ? commitLogCommitAniOut : null} 1.5s 5.2s forwards;
`;

export const mainItemIssueLogImageBox = (isAni: boolean) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transform: translate3d(100%, 0, 0) scale(0.7);
  animation: ${isAni ? commitLogIssueAniIn : null} 1.2s 2.75s forwards,
    ${isAni ? commitLogIssueAniOut : null} 1.5s 5.25s forwards;
`;

export const mainItemCommitLogImageInnerBox = css`
  position: absolute;
  top: -10%;
  width: 50%;
  height: 126.5%;
  background: white;
  border-radius: 0.5vh;
  box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.1),
    2px 4px 8px -4px rgb(0 0 0 / 0.1);
  transform: translate3d(50%, 0, 0);
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
  @media screen and (max-width: 450px) {
    width: 50%;
    transform: translate3d(50%, 0, 0);
    & > img {
      object-fit: fill;
    }
  }
  @media screen and (max-width: 361px) {
    width: 41%;
    transform: translate3d(71%, 0, 0);
    & > img {
      object-fit: fill;
    }
  }
`;

export const mainItemIsuueLogImageInnerBox = css`
  ${mainItemCommitLogImageInnerBox};
  height: 125%;
`;

export const mainItemProgressBox = css`
  ${mainItemPreviewBox};
  background: rgb(235, 235, 235);
  background: linear-gradient(
    90deg,
    rgba(235, 235, 235, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

export const mainItemProgressLayoutBox = (isAni: boolean) => css`
  ${mainItemLayoutBox};
  perspective: 400px;
  perspective-origin: center;
  animation: ${isAni ? toLittleGrayBackground : null} 2s 1s forwards;
`;

export const mainItemProgressLayoutInnerBox = css`
  width: 100%;
`;

export const mainItemProgressTitle = css`
  ${mainItemTitleStyle};
  & > img {
    display: inline-block;
    padding-bottom: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 450px) {
    width: 70%;
  }
  @media screen and (max-width: 361px) {
    width: 85%;
    font-size: 1.9rem;
  }
`;

export const mainItemProgressSubTitle = css`
  ${mainItemPreviewScrollBoxTitle};
`;

export const mainItemProgressDescBox = css`
  ${mainItemPreviewScrollBox};
  width: 90%;
  margin: 0 auto;
  transition: 0.7s ease-out;
  text-align: center;
  & > h3 {
    width: 60%;
  }
  & > h3 > span {
    font-weight: 500;
  }
  @media screen and (min-width: 1280px) {
    font-size: 2.5vh;
  }
  @media screen and (max-width: 361px) {
    font-size: 1.8vh;
  }
`;

export const mainItemProgressA = (isAni: boolean) => css`
  ${mainItemEditableStyle};

  background: white;
  transform: translate3d(0, 35%, 0);
  box-shadow: 2px 5px 5px -3px rgb(0 0 0 / 0.1),
    2px 4px 8px -4px rgb(0 0 0 / 0.1);
  animation: ${isAni ? toGrayBackground : null} 1.5s 1s forwards;

  & > div:nth-of-type(1) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    & > div {
      background: white;
    }
  }
  &::before {
    position: absolute;
    content: '1주차 스프린트';
    top: 3%;
    left: 3%;
    font-size: 1rem;
    font-weight: 700;
  }
  @media screen and (min-width: 1280px) {
    &::before {
      font-size: 1.8rem;
    }
  }
  @media screen and (max-width: 450px) {
    transform: translate3d(0, 35%, 0) scale(0.8);
  }
  @media screen and (max-width: 361px) {
    width: 100%;
  }
`;

export const mainItemProgressAbarBox = (isAni: boolean) => css`
  position: absolute;
  top: 3%;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.1vh;
  font-size: 0.9vh;
  border-radius: 0.2rem;
  & > span:nth-of-type(2) {
    position: relative;
    font-size: 0.8rem;
    &::before {
      position: absolute;
      content: attr(aria-label);
      top: 0;
      left: 0;
      animation: ${isAni ? progressBar66Span : null} 1s 1s forwards,
        ${isAni ? progressBar100Span : null} 1s 5.5s forwards,
        ${isAni ? textColorToWhite : null} 1s 0.5s forwards;
    }
  }
`;

export const mainItemProgressAbar = (isAni: boolean) => css`
  ${previewProgressBarSpan};
  margin-right: 0.3rem;
  &::before {
    animation: ${isAni ? progressBar66 : null} 1.5s 1s forwards,
      ${isAni ? progressBar100 : null} 1.5s 5.5s forwards;
  }
`;

export const mainItemProgressTabBox = (isAni: boolean) => css`
  ${previewProgressTabBox};
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  transform: translate3d(0, -50%, 0);
  & > div:nth-of-type(1) {
    & > div {
      z-index: 3;
      background: white;
      animation: ${isAni ? progressTodoTranslateAani : null} 1.5s 3.1s forwards,
        ${isAni ? progressTodoTranslateBani : null} 1.5s 5.5s forwards;
    }
    & > span {
      animation: ${isAni ? progressNewPostToTopAni : null} 1s 3.4s forwards;
    }
  }
  & > div:nth-of-type(2) {
    & > div {
      background: white;
      animation: ${isAni ? progressProgressTranslateAni : null} 1.5s 0.5s
        forwards;
    }
    & > span {
      animation: ${isAni ? progressNewPostToTopAni : null} 1s 0.8s forwards,
        ${isAni ? progressNewPostToBottomHalfAni : null} 1s 3.3s forwards,
        ${isAni ? progressNewPostToTopLastAni : null} 1s 5.7s forwards;
    }
  }
  & > div:nth-of-type(3) {
    & > div {
      background: white;
    }
    & > span {
      animation: ${isAni ? progressNewPostToBottomAni : null} 1s 0.8s forwards,
        ${isAni ? progressNewPostToBottomLastAni : null} 1.3s 5.9s forwards;
    }
  }
`;

export const mainItemProgressTab = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: 0.9vh;
  & > h3:nth-of-type(1) {
    width: fit-content;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    border-radius: 4px;
  }
  & > span:nth-of-type(1) {
    font-size: 0.7vh;
  }
  & > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.7vh;
    color: rgba(0, 0, 0, 0.5);
    border: 0.05vh solid rgba(0, 0, 0, 0.5);
    border-radius: 0.4vh;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
  }
  @media screen and (min-width: 1280px) {
    & > h3:nth-of-type(1) {
      font-size: 1rem;
    }
    & > div:nth-of-type(1) {
      height: 25%;
    }
    & > span:nth-of-type(1) {
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 361px) {
    & > div:nth-of-type(1) {
      max-height: 27px;
    }
  }
`;

export const mainItemProgressB = (isAni: boolean) => css`
  ${mainItemEditableStyle};
  position: absolute;
  background: white;
  transform: translate3d(0, 100%, 0) scale(0.7) rotateX(-50deg);
  box-shadow: 2px -3px 3px -3px rgb(0 0 0 / 0.1),
    2px -2px 5px 1px rgb(0 0 0 / 0.1);
  animation: ${isAni ? mainItemProgressBani : null} 1.5s 7s forwards;
  & > div:nth-of-type(1) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      height: 40%;
      & > svg {
        position: absolute;
        top: 5%;
        left: 5%;
        width: 20px;
        height: 20px;
      }
      & > div:nth-of-type(1),
      div:nth-of-type(2),
      div:nth-of-type(3),
      div:nth-of-type(4) {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0%;
        left: 0%;
        transform: translate3d(50%, 50%, 0);
        transition: 0.7s ease-out;
        animation: ${isAni ? progressSvgScaleAni : null} 1.5s 8s forwards;
        & > div:nth-of-type(1) {
          position: absolute;
          width: 150px;
          height: 150px;
          background: #3a9ad2;
          border-radius: 50%;
          transform: translate3d(-50%, -50%, 0);
          &::before {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            content: '100%';
            top: 50%;
            left: 50%;
            width: 88%;
            height: 88%;
            font-size: 2rem;
            background: white;
            border-radius: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        & > div:nth-of-type(2) {
          position: absolute;
          top: -120%;
          left: 0%;
          width: 100%;
          font-size: 1.5rem;
          white-space: nowrap;
          animation: ${isAni ? progressSvgTextScaleAni : null} 1.5s 8s forwards;
        }
      }
      & > div:nth-of-type(2) {
        opacity: 0;
        transform: scale(0.5);
        animation: ${isAni ? progressSvgOpacityAni : null} 1.5s 9s forwards;
        & > div:nth-of-type(1) {
          &::before {
            content: '33%';
          }
          background: rgba(0, 0, 0, 0.15);
          & > svg > circle {
            stroke: #f19c49;
            transition: 0.7s ease-out;
            animation: ${isAni ? progressSvgStroke33Ani : null} 1.5s 9s forwards;
          }
        }
      }
      & > div:nth-of-type(3) {
        opacity: 0;
        transform: scale(0.5);
        animation: ${isAni ? progressSvgOpacityAni : null} 1.5s 9s forwards;
        & > div:nth-of-type(1) {
          &::before {
            content: '66%';
          }
          background: rgba(0, 0, 0, 0.15);
          & > svg > circle {
            stroke: #26b16e;
            transition: 0.7s ease-out;
            animation: ${isAni ? progressSvgStroke66Ani : null} 1.5s 9s forwards;
          }
        }
      }
      & > div:nth-of-type(4) {
        opacity: 0;
        transform: scale(0.5);
        animation: ${isAni ? progressSvgOpacityAni : null} 1.5s 9s forwards;
        & > div:nth-of-type(1) {
          &::before {
            content: '25%';
          }
          background: rgba(0, 0, 0, 0.15);
          & > svg > circle {
            stroke: #f19c49;
            transition: 0.7s ease-out;
            animation: ${isAni ? progressSvgStroke25Ani : null} 1.5s 9s forwards;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1280px) {
  }
  @media screen and (max-width: 450px) {
    & > div:nth-of-type(1) {
      & > div {
        & > div:nth-of-type(1),
        div:nth-of-type(2),
        div:nth-of-type(3),
        div:nth-of-type(4) {
          width: 35%;
        }
      }
    }
  }
  @media screen and (max-width: 361px) {
    width: 100%;
    & > div:nth-of-type(1),
    div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(4) {
      transform: scale(0.95);
    }
  }
`;

export const progressSvg = css`
  width: 150px;
  height: 150px;
  transform: rotate(-90deg);
  & > circle {
    stroke: black;
    stroke-width: 10px;
    stroke-dashoffset: 440;
    stroke-dasharray: 440;
    fill: transparent;
  }
`;

export const bannerBox = css`
  ${mainItemPreviewBox};
  background: rgb(235, 235, 235);
  background: linear-gradient(
    90deg,
    rgba(235, 235, 235, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

export const bannerLayoutBox = css`
  ${mainItemLayoutBox};
  background: transparent;
`;

export const bannerLayoutInnerBox = css`
  width: 100%;
`;

export const bannerImageBox = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > img {
    object-fit: cover;
  }
  & > div:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.25);
  }
  & > div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 2;
    color: white;
    font-size: 1.8rem;
    font-weight: 900;
    transform: translate3d(-50%, -50%, 0);
    & > div {
      position: absolute;
      top: 30%;
    }
  }
  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(2) {
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 450px) {
    & > div:nth-of-type(2) {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 361px) {
    & > div:nth-of-type(2) {
      & > div {
        font-size: 1.3rem;
      }
    }
  }
`;

export const bannerBtn = css`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  padding: 1.5vh 3vh;
  background: black;
  color: white;
  font-weight: 700;
  border-radius: 8px;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 3px -1px 5px 1px rgb(0 0 0 / 0.2);
  transition: 0.5s;
  overflow: hidden;
  &::before {
    position: absolute;
    content: '';
    top: -50%;
    left: -40%;
    width: 2%;
    height: 200%;
    z-index: 3;
    background: white;
    transform: rotate(45deg);
  }
  &::after {
    position: absolute;
    content: '';
    top: -50%;
    left: -30%;
    width: 5%;
    height: 200%;
    z-index: 3;
    background: white;
    transform: rotate(45deg);
  }
  &:hover {
    background: white;
    color: black;
    &::before {
      animation: ${bookmarkBlingAni} 1s forwards;
    }
    &::after {
      animation: ${bookmarkBlingAni} 1s forwards;
    }
  }
  @media screen and (min-width: 1280px) {
    padding: 2.5vh 4vh;
    font-size: 2.5vh;
  }
`;

export const footer = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
  background: white;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
    padding: 1rem 0;
  }
  @media screen and (max-width: 361px) {
    & > div {
      width: 80%;
    }
  }
`;
