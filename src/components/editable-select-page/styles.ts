import { css } from '@emotion/react';

export const grid = css`
  display: grid;
  gap: 1rem;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
`;

export const button = css`
  padding: 5px 10px;
  &:hover {
    background: #eee;
  }
  border-radius: 8px;
`;
