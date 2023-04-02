import { css } from '@emotion/react';

const flexCenterNavBar = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  user-select: none;
`;

export const navBar = css`
  display: flex;
  width: 100%;
`;

export const profileBox = css`
  ${flexCenterNavBar}
  width: 200px;
  outline: 1px solid limegreen;
`;

export const titleBox = css`
  ${flexCenterNavBar}
  flex-grow: 1;
  outline: 1px solid limegreen;
`;

export const loginBox = css`
  ${flexCenterNavBar}
  width: 200px;
  outline: 1px solid limegreen;
`;

export const projectNameBox = css`
  ${flexCenterNavBar}
  justify-content: flex-end;
  width: 250px;
  outline: 1px solid limegreen;
`;

export const modalBackground = (isOpen: boolean) => css`
  position: fixed;
  display: ${isOpen ? `block` : `none`};
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
`;

export const projectNambeBoxTransition = (isOpen: boolean) => css`
  transition: 0.1s ease-out;
  transform-origin: top;
  transform: scale(${isOpen ? `1` : `0.5`});
  transform-duration: ${isOpen ? `0.1s` : `0.25s`};
  opacity: ${isOpen ? `1` : `0`};
  & > * {
    display: ${isOpen ? `block` : `none`};
  }
  user-select: none;
  position: absolute;
  right: 0;
  margin-top: 0.75rem;
  width: 192px;
  border-top-width: 1px;
  border-bottom-width: 0px;
  border-color: rgb(243 244 246);
  border-radius: 0.375rem;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:focus {
    outline: none;
  }
`;

export const projectInviteBox = (isOpen: boolean) => css`
  position: fixed;
  display: ${isOpen ? `flex` : `none`};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: 2px solid green;
`;

export const inviteModalBackground = (isOpen: boolean) => css`
  position: fixed;
  top: 50px;
  left: 0;
  display: ${isOpen ? `block` : `none`};
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.25;
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

export const loginLogo = css`
  display: inline-block;
  width: 60px;
  height: 30px;
`;

export const profileInnerBox = css`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

export const profileImageBox = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;
