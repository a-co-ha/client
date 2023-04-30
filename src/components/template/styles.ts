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
`;

export const progress = css`
  width: 5rem;
  height: 1rem;
  background-color: white;
  border: solid;
`;
export const dealt = (dealt: number) => css`
  background-color: red;
  width: ${dealt + '%'};
  height: 100%;
`;
