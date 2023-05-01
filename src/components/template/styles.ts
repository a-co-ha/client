import { css } from '@emotion/react';

export const mainContainer = css`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const progressContainer = css`
  flex-basis: 0;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
`;

export const progressSection = css`
  flex-basis: 30%;
`;

export const progressInPage = css`
  border: solid;
  height: 5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

export const gaugeContainer = css`
  align-self: flex-end;
  display: flex;
`;

export const progress = (dealt: number) => css`
  width: 10rem;
  height: 1rem;
  background-color: white;
  border: ${dealt >= 80 ? '#57a1de' : dealt >= 50 ? '#dcde57' : '#de5760'};
  box-shadow: 0 0 2px
    ${dealt >= 80 ? '#57a1de' : dealt >= 50 ? '#dcde57' : '#de5760'};
  margin-right: 1rem;
  border-radius: 1rem;
  ${dealt === 100
    ? `filter: drop-shadow(0 0 2px ${
        dealt >= 80 ? '#57a1de' : dealt >= 50 ? '#dcde57' : '#de5760'
      })`
    : ''}
`;
export const dealt = (dealt: number) => css`
  width: ${dealt + '%'};
  height: 100%;
  border-radius: 1rem;
  background-color: ${dealt >= 80 ? '#57a1de' : dealt >= 50 ? 'yellow' : 'red'};
`;
