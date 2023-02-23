import { css } from '@emotion/react';

const flexCenterNavBar = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
`;

export const navBar = css`
  display: flex;
  width: 100%;
`;

export const profileBox = css`
  ${flexCenterNavBar}
  outline: 1px solid limegreen;
`;

export const titleBox = css`
  ${flexCenterNavBar}
  flex-grow: 1;
  outline: 1px solid limegreen;
`;

export const loginBox = css`
  ${flexCenterNavBar}
  outline: 1px solid limegreen;
`;

export const userListBox = css`
  ${flexCenterNavBar}
  outline: 1px solid limegreen;
`;

export const loginLogo = css`
  display: inline-block;
  width: 60px;
  height: 30px;
`;
