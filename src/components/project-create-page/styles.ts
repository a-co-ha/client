import { css } from '@emotion/react';

export const createProjectBox = css`
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  outline: 2px solid red;
  & select {
    width: 80%;
    background: red;
    margin: 5px;
  }
`;

export const cancelBtn = css`
  display: block;
  padding: 3px 10px;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 4px;
`;
