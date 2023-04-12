import { css } from '@emotion/react';

export const chatPage = css`
  position: relative;
  text-align: center;
  flex-basis: 0;
  flex-grow: 1;
  height: calc(100vh - 50px);
  outline: 1px solid limegreen;
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
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem 0;
  background: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const messageBox = css`
  text-align: right;
  position: relative;
  padding-bottom: 1rem;
  overflow-y: scroll;
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

export const messageAlign = (isMyMessage: boolean) => css`
  display: flex;
  justify-content: ${isMyMessage ? `flex-end` : `flex-start`};
`;

export const message = (isMyMessage: boolean) => css`
  display: inline-block;
  max-width: 180px;
  padding: 0.5rem;
  line-height: 1rem;
  font-size: 0.75rem;
  margin: ${isMyMessage ? `0.375rem 0 0 auto` : `0.375rem 0 0 0.7rem`};
  background: #ffd6dc;
  border-radius: 0.75rem;
  ${isMyMessage
    ? `border-top-right-radius: 0.2rem`
    : `border-top-left-radius: 0.2rem`};
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const messageNameAlign = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const messageNameBox = (isMyMessage: boolean) => css`
  display: block;
  line-height: 0.75rem;
  font-size: 0.75rem;
  margin: ${isMyMessage ? `0` : `0 0 0 0.7rem`};
`;

export const messageName = (isMyMessage: boolean, isDisplay: boolean) => css`
  display: ${isMyMessage ? `none` : isDisplay ? `inline` : `none`};
`;

export const messageTime = (isDisplay: boolean) => css`
  display: ${isDisplay ? 'inline' : 'none'};
  margin-left: 5px;
  color: gray;
`;

export const messageImgBox = (isMyMessage: boolean, isDisplay: boolean) => css`
  display: ${isMyMessage ? `none` : `block`};
  width: 35px;
  height: 35px;
  margin-left: 1rem;
  opacity: ${isDisplay ? `1` : `0`};
`;
