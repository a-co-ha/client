import { css } from '@emotion/react';

export const chatPage = css`
  position: relative;
  min-width: 310px;
  text-align: center;
  flex-basis: 0;
  flex-grow: 1;
  height: calc(100vh - 50px);
  z-index: 0;
  background: transparent;
  @media screen and (max-width: 450px) {
    min-width: 100vw;
    // z-index: 3;
    background: white;
  }
`;

export const chatPageInnerBox = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const chatFormBox = css`
  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;
  margin: 0 1rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const chatFormInputBox = css`
  display: flex;
`;

export const chatFormBtn = css`
  padding-inline: 0.5rem;
`;

export const chatFormInput = css`
  display: block;
  flex-grow: 1;
  font-size: 0.8rem;
  line-height: 1.2rem;
  padding: 0.5rem;
  background: transparent;
  resize: none;
  white-space: pre-wrap;
  word-break: break-word;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
  }
`;

export const messageBox = css`
  text-align: right;
  position: relative;
  padding-right: 44px;
  padding-bottom: 1rem;
  overflow: hidden scroll;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 5px solid transparent;
    background-color: #efefef;
    border-radius: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const messageAlign = (isDisplay: boolean) => css`
  display: flex;
  justify-content: flex-start;
  margin-top: ${isDisplay ? `1.5rem` : `0`};
`;

export const messageContentBox = (isMyMessage: boolean) => css`
  max-width: 815px;
  padding: 0.5rem;
  margin: 0.375rem 0 0 0.7rem;
  line-height: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: start;
  background: ${isMyMessage
    ? `
#bddc95`
    : `#ffd6dc`};
  border-radius: 0.75rem;
  border-top-left-radius: 0.2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const messageContentInnerBox = css`
  max-height: 310px;
  overflow: hidden;
`;

export const message = css`
  display: inline-block;
  white-space: pre-wrap;
  line-height: 1.1rem;
  word-break: break-word;
  & code {
    font-size: 0.7rem;
    white-space: pre-wrap !important;
    word-break: break-word !important;
  }
  & code span {
    min-width: 0 !important;
  }
`;

export const messageMoreBox = css`
  display: none;
  text-align: center;
  user-select: none;
`;

export const messageMoreSpan = css`
  font-size: 1.5rem;
  color: gray;
  padding: 0.375rem 0;
`;

export const messageMoreBtn = css`
  display: block;
  width: 100%;
  padding: 0.375rem 0;
  margin: 0 auto;
  color: gray;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: white;
  }
  &:focus {
    outline: none;
  }
  line-height: 1.2rem;
  border-radius: 0.375rem;
`;

export const messageNameAlign = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const messageNameBox = css`
  display: block;
  line-height: 0.75rem;
  font-size: 0.75rem;
  margin: 0 0 0 0.7rem;
`;

export const messageName = (isDisplay: boolean) => css`
  display: ${isDisplay ? `inline` : `none`};
`;

export const messageTime = (isDisplay: boolean) => css`
  display: ${isDisplay ? 'inline' : 'none'};
  margin-left: 5px;
  color: gray;
`;

export const messageImgBox = (isDisplay: boolean) => css`
  display: block;
  min-width: 40px;
  height: 40px;
  margin-left: 1rem;
  opacity: ${isDisplay ? `1` : `0`};
  pointer-events: ${isDisplay ? `auto` : `none`};
`;

export const messageImgBtn = (isDisplay: boolean) => css`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ${isDisplay ? `pointer` : `unset`};
`;

export const messageModalBox = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: ${isOpen ? `100vw` : `0`};
  height: ${isOpen ? `100vh` : `0`};
  font-size: 0.875rem;
  line-height: 1.25rem;
  z-index: 13;
`;

export const messageModalBoxTransition = (isOpen: boolean) => css`
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

export const messageModalBackground = (isOpen: boolean) => css`
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
