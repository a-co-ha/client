import { css } from '@emotion/react';

export const progressContainer = css`
  flex-basis: 0;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  height: calc(100vh - 50px);
  padding-right: 44px;
  padding-bottom: 2rem;
  overflow: hidden scroll;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 5px solid transparent;
    background-color: #efefef;
    border-radius: 0.5rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const progressSection = css`
  flex-basis: 50%;
`;

export const progressInPage = css`
  border: solid;
  height: 5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
