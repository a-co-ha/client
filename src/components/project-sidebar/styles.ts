import { css } from '@emotion/react';

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const flexRowCenter = css`
  display: flex;
`;

export const projectSideBarBox = css`
  ${flexRowCenter}
  width: 200px;
  height: 100vh;
  outline: 1px solid limegreen;
`;

export const list = css`
  ${flexColumnCenter}
  width: 60px;
  outline: 1px solid red;
`;

export const channel = css`
  ${flexColumnCenter}
  flex-grow: 1;
  outline: 2px solid blue;
`;

export const createBtn = css`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
`;

export const inputForm = css`
  width: 100%;
  padding: 5px 13px 5px;
  border: 1px solid gray;
  border-radius: 6px;
  &:focus {
    outline: none;
  }
`;
