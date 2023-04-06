import { css } from '@emotion/react';

export const chatPage = css`
  position: relative;
  text-align: center;
  flex-basis: 0;
  flex-grow: 1;
  height: calc(100vh - 50px);
  outline: 1px solid limegreen;
`;

export const chatMessageBox = css`
  background: green;
`;

export const chatPageInnerBox = css`
  display: flex;
  flex-direction: column;
  // height: 100%;
`;

export const chatFormBox = css`
  position: absolute;
  width: 100%;
  bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const chatFormInputBox = css`
  display: flex;
  justify-content: space-between;
  height: auto;
`;

export const chatFormInput = css`
  height: auto;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem 0;
  background: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;
