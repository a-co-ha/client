import { css } from '@emotion/react';

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  outline: 1px solid red;
`;

export const contentBox = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 150px;
  margin: 0 auto;
`;

export const contentBoxTitle = css`
  text-align: left;
`;

export const content = css`
  height: 150px;
  border: 1.5px solid gray;
  border-radius: 4px;
`;

export const main = css`
  display: flex;
`;

export const mainContentBox = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
