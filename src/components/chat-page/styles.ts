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
  // bottom: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const chatFormInputBox = css`
  display: flex;
  justify-content: space-between;
`;

export const chatFormInput = css`
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

export const message = css`
  display: inline-block;
  padding: 0.5rem;
  line-height: 1rem;
  font-size: 0.75rem;
  margin: 0.375rem 0;
  background: #ffd6dc;
  border-radius: 0.75rem;
  border-bottom-right-radius: 0.2rem;
`;
