import { css } from '@emotion/react';

export const userListBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 30vh;
  box-shadow: 0 5px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const userListInnerBox = css`
  position: relative;
  width: 100%;
  margin-top: 1rem;
  text-align: center;
`;

export const user = css`
  width: 100%;
  padding: 0.5rem 0;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const userName = css`
  font-size: 0.8rem;
`;

export const adminCrown = (isAdmin: boolean) => css`
  display: ${isAdmin ? `inline-block` : `none`};
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

export const isUserOnline = (isOnUser: boolean, isAdmin: boolean) => css`
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  vertical-align: middle;
  background: ${isOnUser ? `limegreen` : `gray`};
  border-radius: 50%;
`;

export const userModalBackground = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  display: ${isOpen ? `block` : `none`};
  width: ${isOpen ? `100vw` : `0`};
  height: ${isOpen ? `100vh` : `0`};
  z-index: 11;
  cursor: initial;
`;

export const userModalTransition = (isOpen: boolean) => css`
  position: relative;
  & > * {
    display: ${isOpen ? `block` : `none`};
  }
  top: 0;
  left: 0;
  z-index: 12;
  transform: translate3d(-105%, 0, 0) scale(${isOpen ? `1` : `0.5`});
  transform-origin: right;
  transform-duration: ${isOpen ? `0.1s` : `0.25s`};
  opacity: ${isOpen ? `1` : `0.5`};
  transition: 0.1s ease-out;
`;

export const userModalBox = css`
  position: absolute;
  width: 200px;
  max-width: 16rem;
  padding: 0.5rem;
  max-height: 80vh;
  text-align: left;
  vertical-align: middle;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  z-index: 3;
`;

export const userModalRightArrow = css`
  position: absolute;
  top: 50%;
  right: -5%;
  width: 10px;
  height: 10px;
  transform: translate3d(-50%, -50%, 0) rotate(45deg);
  background: white;
`;

export const userModalBtn = css`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &:hover {
    color: white;
    background-color: rgb(139 92 246);
  }
`;
