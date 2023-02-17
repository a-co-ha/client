import { css } from '@emotion/react';

export const draggable = css`
  display: block;
  &:hover {
    span {
      opacity: 1;
    }
  }
`;

export const dragHandle = css`
  opacity: 0;
  display: inline-block;
  width: 1rem;
  img {
    display: block;
    margin: auto;
  }
`;
export const block = css`
  display: inline-block;
  width: calc(100% - 1.2rem);
  padding: 0.25rem;
  -webkit-user-select: text;
  user-select: text;
  outline: 2px solid limegreen;
  padding: 10px;
  margin: 1px;
`;
