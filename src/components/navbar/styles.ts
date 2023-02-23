import { css } from '@emotion/react';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const navBar = css`
  display: flex;
  width: 100%;
  height: 100px;
`;

export const profileBox = css`
  ${flexCenter}
  width: 200px;
  height: 50px;
  outline: 1px solid limegreen;
`;

export const titleBox = css`
  ${flexCenter}
  flex-grow: 1;
  width: 200px;
  height: 50px;
  outline: 1px solid limegreen;
`;

export const loginBox = css`
  ${flexCenter}
  width: 200px;
  height: 50px;
  outline: 1px solid limegreen;
`;

export const loginLogo = css`
  width: 60px;
  height: 30px;
`;
