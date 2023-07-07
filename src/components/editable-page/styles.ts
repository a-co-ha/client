import { css } from '@emotion/react';

export const Conatainer = (type: string) => css`
  width: ${type == 'normal' ? `100%` : `60%`};
  @media screen and (min-width: 768px) {
    position: static;
    width: ${type == 'normal' ? `100%` : `60%`};
  }
  @media screen and (max-width: 767px) {
    position: ${type == 'normal' ? `static` : `absolute`};
    width: 100%;
  }
  background-color: white;
`;

export const contentBox = css`
  position: relative;
  flex-basis: 0;
  flex-grow: 1;
  padding: 1rem;
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
