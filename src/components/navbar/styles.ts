import { css, keyframes } from '@emotion/react';

//LoginButton Animation
const loginBtnAni = keyframes`
  25% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(-35deg);
  }
  75% {
    transform: rotate(35deg);
  }
  90% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(0deg);
    color: black;
  }
`;

const flexCenterNavBar = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  user-select: none;
`;

export const navBar = css`
  position: relative;
  display: flex;
  width: 100%;
  z-index: 3;
`;

export const navBarBackIconBox = (isOpen: boolean) => css`
  display: none;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  color: black;
  z-index: 5;
  & > svg {
    width: 40px;
    height: 40px;
  }
  transition: 0.5s;
  transform: rotate(${isOpen ? `180deg` : `0`});
  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

export const navBarRightSidebarIconBox = (isOpen: boolean) => css`
  display: none;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  color: black;
  z-index: 5;
  & > svg {
    width: 20px;
    height: 20px;
  }
  transition: 0.5s;
  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

export const landingPageNavbarBox = (isScroll: boolean) => css`
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 3;
  font-weight: 600;
  background: white;
  box-shadow: ${isScroll
    ? `0px 5px 5px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1)`
    : `unset`};
  user-select: none;
  transition: 0.5s;
`;

export const landingPageNavbarImageBox = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
`;

export const landingPageNavbarImageAlign = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const landingPageNavbarImageDesc = css`
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;

export const landingPageNavbarImage = css`
  border-radius: 50%;
`;

export const profileBox = css`
  ${flexCenterNavBar}
  min-width: 200px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 450px) {
    min-width: 25%;
  }
`;

export const titleBox = css`
  ${flexCenterNavBar}
  width: 310px;
  flex-grow: 1;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 450px) {
    min-width: 55%;
  }
`;

export const alertBox = css`
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
`;

export const projectNameBox = (isOpen: boolean) => css`
  ${flexCenterNavBar}
  justify-content: flex-end;
  min-width: 260px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  @media screen and (max-width: 450px) {
    transition: 0.5s;
    transition-delay: ${!isOpen ? `0.5s` : `0`};
    min-width: ${!isOpen ? `40px` : `130px`};
    & > div:nth-of-type(4) > div:nth-of-type(2) div:nth-of-type(1) {
      max-width: 130px;
      opacity: ${!isOpen ? `0` : `1`};
      transition: 0.5s;
      & > p {
        margin-left: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export const modalBackground = (isOpen: boolean) => css`
  position: fixed;
  display: ${isOpen ? `block` : `none`};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const projectNameBoxTransition = (isOpen: boolean) => css`
  transition: 0.1s ease-out;
  transform-origin: top;
  transform: scale(${isOpen ? `1` : `0.5`});
  transform-duration: ${isOpen ? `0.1s` : `0.25s`};
  opacity: ${isOpen ? `1` : `0`};
  & > * {
    display: ${isOpen ? `block` : `none`};
  }
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  margin-top: 0.75rem;
  width: 224px;
  border-top-width: 1px;
  border-bottom-width: 0px;
  border-color: rgb(243 244 246);
  border-radius: 0.375rem;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 450px) {
    position: fixed;
    width: 50%;
    left: 0;
    z-index: 4;
  }
`;

export const projectInviteBox = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: ${isOpen ? `100vw` : `0`};
  height: ${isOpen ? `100vh` : `0`};
  font-size: 0.875rem;
  line-height: 1.25rem;
  z-index: 13;
`;

export const projectInviteBoxTransition = (isOpen: boolean) => css`
  position: absolute;
  & > * {
    display: ${isOpen ? `block` : `none`};
  }
  top: 50%;
  left: 50%;
  z-index: 12;
  transform: translate3d(-50%, -50%, 0) scale(${isOpen ? `1` : `0.5`});
  transform-origin: center;
  transform-duration: ${isOpen ? `0.1s` : `0.25s`};
  opacity: ${isOpen ? `1` : `0.5`};
  transition: 0.1s ease-out;
`;

export const inviteModalBackground = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  display: ${isOpen ? `block` : `none`};
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.2;
  z-index: 11;
`;

export const inviteModalCopyBtn = (isCopied: boolean) => css`
  padding: 0.5rem 1rem;
  font-weight: 500;
  background-color: ${isCopied ? `rgb(226 232 240)` : `rgb(219 234 254)`};
  border-radius: 0.375rem;
  &:hover {
    background-color: ${isCopied ? `none` : `rgb(191 219 254)`};
  }
  &:focus {
    outline: none;
  }
`;

export const inviteModalShareBtn = css`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: white;
  background-color: rgba(248, 93, 117, 0.9);
  border-radius: 0.375rem;
  &:hover {
    background-color: rgba(248, 93, 117, 1);
  }
  &:focus {
    outline: none;
  }
`;

export const projectDeleteInput = css`
  border-bottom: 1px solid gray;
  &:focus {
    outline: none;
  }
`;

export const projectDeleteNameBtn = (
  inputName: string,
  channelName: string
) => css`
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: ${inputName === channelName ? `white` : `black`};
  cursor: pointer;
  background-color: ${inputName === channelName
    ? `rgba(255,0,0,0.7)`
    : `rgb(226 232 240)`};
  border-radius: 0.375rem;
  &:hover {
    background-color: ${inputName === channelName
      ? `rgba(255,0,0,0.8)`
      : `rgb(226 232 240)`};
  }
  &:focus {
    outline: none;
  }
`;

export const loginBox = css`
  ${flexCenterNavBar};
  min-width: 100px;
`;

export const loginBtn = css`
  padding: 1rem;
  margin-left: auto;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    animation: ${loginBtnAni} 0.5s forwards;
  }
`;

export const loginModalBox = (isOpen: boolean) => css`
  ${projectInviteBox(isOpen)};
`;

export const loginModalBackground = (isOpen: boolean) => css`
  ${inviteModalBackground(isOpen)};
`;

export const loginModalTransition = (isOpen: boolean) => css`
  ${projectInviteBoxTransition(isOpen)};
  width: 80%;
  max-width: 400px;
`;

export const loginModal = css`
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background: white;
  border-radius: 8px;
  box-shadow: 2px 10px 5px -3px rgb(0 0 0 / 0.1),
    2px 10px 6px -4px rgb(0 0 0 / 0.1);
  & > h3 {
    font-size: 1.25rem;
  }
`;

export const loginModalDesc = css`
  padding-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  word-break: keep-all;
  color: rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 361px) {
    font-size: 0.8rem;
  }
`;

export const loginLogo = css`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const loginModalBtnBox = css`
  margin-top: 0.5rem;
  text-align: center;
`;

export const profileInnerBox = css`
  position: relative;
  display: flex;
  width: 100%;
  padding-inline: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    & > button:nth-of-type(1) {
      display: none;
    }
  }
`;

export const profileImageBox = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (max-width: 450px) {
    margin: 0 20px 0 auto;
  }
  @media screen and (max-width: 361px) {
    width: 30px;
    height: 30px;
  }
`;

export const profileLogoutBtn = css`
  width: 20px;
  margin-left: 4px;
  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 450px) {
    position: absolute;
    right: 5%;
    height: 100%;
  }
`;

export const projectChangeImgModalBox = (isOpen: boolean) => css`
  ${projectInviteBox(isOpen)};
`;

export const projectChangeImgModalBackground = (isOpen: boolean) => css`
  ${inviteModalBackground(isOpen)};
`;

export const projectChangeImgModalTransition = (isOpen: boolean) => css`
  ${projectInviteBoxTransition(isOpen)};
`;

export const projectChangeImgModalFormBox = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  & > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

export const projectChangeImgForm = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const projectChangeImgInputBox = css`
  position: relative;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
`;

export const projectChangeImgLabel = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
  cursor: pointer;
  &::before {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    content: '+';
    font-size: 2rem;
    color: white;
  }
  &:hover {
    opacity: 1;
  }
`;

export const projectChangeImgInput = css`
  width: 0;
`;

export const projectChangeNameForm = css`
  ${projectChangeImgForm};
`;

export const projectChangeNameBox = css`
  padding: 1rem;
  font-size: 1.5rem;
`;

export const projectChangeNameInput = css`
  text-align: center;
  border-bottom: 0.1px solid black;
`;

export const projectChangeNameDiv = css`
  position: relative;
  padding-top: 0.25rem;
`;
export const projectChangeNameDivIcon = css`
  display: inline-block;
  position: absolute;
  padding-left: 0.5rem;
  opacity: 1;
  color: black;
  cursor: pointer;
  &:hover svg {
    color: #efb925;
  }
`;

export const projectChangeImgSubmitBtnBox = css`
  margin-top: 1rem;
  margin-bottom: auto;
`;

export const projectChangeImgSubmitBtn = css`
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 2px 5px 5px -1px rgb(0 0 0 / 0.1),
    2px 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: 0.5s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
