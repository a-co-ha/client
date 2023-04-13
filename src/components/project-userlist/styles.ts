import { css } from '@emotion/react';

export const userListBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  // text-align: center;
  width: 200px;
`;

export const userName = css`
  font-size: 0.8rem;
`;

export const isUserOnline = css`
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  vertical-align: middle;
  background: limegreen;
  border-radius: 50%;
`;
