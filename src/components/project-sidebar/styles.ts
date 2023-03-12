import { css } from '@emotion/react';

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const flexRowCenter = css`
  display: flex;
`;

export const projectSideBarBox = css`
  ${flexRowCenter}
  width: 250px;
  height: 100vh;
  outline: 1px solid limegreen;
`;

export const list = css`
  ${flexColumnCenter}
  width: 60px;
  outline: 1px solid red;
`;

export const channel = css`
  ${flexColumnCenter}
  flex-grow: 1;
  outline: 2px solid blue;
`;

export const pageCreateBtnBox = css`
  display: flex;
`;

export const pageCreateBtn = css`
  padding-inline: 12px;
  color: purple;
  &:hover {
    background: gray;
  }
  border-radius: 8px;
`;

export const createBtn = css`
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 4px;
`;

export const inputForm = (error: boolean) => css`
  box-sizing: border-box;
  width: 100%;
  padding: 5px 13px 5px;
  margin-top: 1rem;
  font-size: 0.9rem;
  border: ${error ? `1px solid red` : `1px solid limegreen`};
  border-radius: 6px;
  &:focus {
    outline: none;
  }
`;

export const validationMsg = css`
  color: red;
  user-select: none;
  padding: 5px;
`;

export const projectCreateBtn = css`
  padding: 8px 16px;
  font-size: 0.9rem;
  margin-top: 5px;
  background: #dbe9fe;
  &:hover {
    background: #dbe9aa;
  }
  border-radius: 5px;
`;
