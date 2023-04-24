import { css } from '@emotion/react';

export const errorBackground = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

export const errorImgBox = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const errorMessage = css`
  margin-top: 1rem;
`;
