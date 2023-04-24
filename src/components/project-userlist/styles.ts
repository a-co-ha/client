import { css } from '@emotion/react';

export const userListBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 30vh;
  box-shadow: 0 5px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const userListInnerBox = css`
  margin-top: 1rem;
`;

export const userName = css`
  font-size: 0.8rem;
`;

export const adminCrown = (isAdmin: boolean) => css`
  display: ${isAdmin ? `inline-block` : `none`};
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

export const isUserOnline = (isOnUser: boolean, isAdmin: boolean) => css`
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  vertical-align: middle;
  background: ${isOnUser ? `limegreen` : `gray`};
  border-radius: 50%;
`;
