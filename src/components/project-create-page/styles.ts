import { css } from '@emotion/react';

export const createProjectBox = css`
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  padding-inline: 10px;
  outline: 2px solid red;
  & select {
    width: 100%;
    padding: 5px;
    background: red;
    margin: 5px 0;
  }
`;

export const button = css`
  display: inline-block;
  padding: 3px 10px;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 4px;
  margin-right: 5px;
`;
