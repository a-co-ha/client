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
  width: 200px;
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

export const profileInnerBox = css`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

export const profileImageBox = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;
