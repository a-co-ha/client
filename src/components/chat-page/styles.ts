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
`;

export const chatFormBox = css`
  position: absolute;
  width: calc(100% - 2rem);
  bottom: 1rem;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
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

export const messageBox = css`
  position: absolute;
  right: 1rem;
  padding: 0.5rem;
  margin: 0.375rem 0;
  font-size: 0.75rem;
  line-height: 1rem;
  background: #ffd6dc;
  border-radius: 0.75rem;
  border-bottom-right-radius: 0.2rem;
`;
