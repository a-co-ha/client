import { css } from '@emotion/react';

export const chatBookmarkBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: calc(70vh - 66px);
  margin-top: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const chatBookmarkCreateBtn = css`
  width: 100%;
  height: 2rem;
  &:hover {
    background: #eee;
  }
  &:active {
    // background: #e0e0e0;
    // color: white;
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const chatBookmarkItemBox = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  // outline: 1px solid blue;
`;

export const chatBookmarkItem = css`
  outline: 1px solid red;
`;

export const chatBookmarkModalBackground = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  display: ${isOpen ? `block` : `none`};
  width: ${isOpen ? `100vw` : `0`};
  height: ${isOpen ? `100vh` : `0`};
  background: black;
  opacity: 0.2;
  z-index: 11;
`;

export const chatBookmarkModalTransition = (isOpen: boolean) => css`
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

export const chatBookmarkModalBox = css`
  width: 500px;
  max-width: 32rem;
  padding: 1.5rem;
  text-align: left;
  vertical-align: middle;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const chatBookmarkCopyBtn = (isCopied: boolean) => css`
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

export const chatBookmarkFormModalBox = css`
  width: 500px;
  max-width: 32rem;
  height: 65vh;
  padding: 1.5rem;
  text-align: left;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const chatBookmarkFormInputBox = css`
  display: flex;
  flex-direction: column;
`;

export const chatBookmarkFormInput = css`
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem;
  background: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const chatBookmarkFormBtn = css``;
