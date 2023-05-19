import { css } from '@emotion/react';

export const flexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const mainTitleBox = css`
  padding: 7rem 2rem;
`;

export const mainTitleDesc = css`
  margin-top: 2rem;
`;

export const messageBox = css`
  display: flex;
  position: fixed;
  top: 35%;
  left: 50%;
  font-size: 2rem;
`;

export const messages = css`
  z-index: 2;
`;

export const messageBackground = css`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  z-index: 1;
  line-height: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: start;
  background: #ffd6dc;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &::after {
    position: absolute;
    content: '';
    background: #ffd6dc;
    width: 15px;
    height: 15px;
    left: 45%;
    bottom: -20%;
    transform: rotate(45deg);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;
