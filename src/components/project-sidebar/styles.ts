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
  height: calc(100vh - 50px);
  // outline: 1px solid limegreen;
  // box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const list = css`
  ${flexColumnCenter}
  width: 75px;
  height: calc(100vh - 50px);
  padding-top: 1rem;
  box-shadow: inset 0 5px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 8px -4px rgb(0 0 0 / 0.2);
`;

export const channel = css`
  ${flexColumnCenter}
  width: 250px;
  height: calc(100vh - 50px);
  margin: 0 0.3rem 0.3rem 0;
  // background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
`;

export const pageCreateBtnBox = css`
  display: flex;
  align-items: center;
`;

export const pageCreateBtn = css`
  padding-inline: 12px;
  color: purple;
  &:hover {
    background: gray;
  }
  border-radius: 8px;
`;

export const projectCreateThumbnail = css`
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border-radius: 10px;
  overflow: hidden;
`;
export const projectCreatePlusBtn = css`
  ${projectCreateThumbnail};
  border: 1px solid black;
`;
export const listAllDelete = css`
  ${projectCreateThumbnail};
  border: 1px solid black;
  font-size: 0.5rem;
`;

export const projectNameInput = (error: boolean) => css`
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

export const pageNameInput = css`
  box-sizing: border-box;
  width: 100%;
  color: red;
`;

export const pageNameLink = (
  propsPageId: string,
  pageId: string | string[] | undefined
) => css`
  color: ${pageId !== undefined && propsPageId === pageId ? `black` : `gray`};
  background: ${pageId !== undefined && propsPageId === pageId
    ? `rgb(226 232 240)`
    : `none`};
  border-radius: 0.375rem;
  &:hover {
    background: rgb(241 245 249);
    & > div > button {
      display: block;
    }
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const pageNameEditBtn = css`
  display: none;
  padding: 0;
`;
