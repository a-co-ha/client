import { css } from '@emotion/react';

export const chatBookmarkBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: calc(70vh - 66px);
  margin-top: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const chatBookmarkCreateBtn = css`
  width: 100%;
  height: 2rem;
  font-size: 0.9rem;
  &:hover {
    background: #eee;
  }
  &:active {
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
`;

export const chatBookmarkItemBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 1rem;
  // outline: 1px solid blue;
`;

export const chatBookmarkItem = css`
  width: 100%;
  padding: 0.375rem;
  font-size: 0.8rem;
  cursor: pointer;
  transform-origin: center;
  &:hover {
    background-color: rgb(0 0 0 / 0.5);
    color: white;
  }
  &:active {
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  border-radius: 0.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const chatBookmarkModalBackground = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  display: ${isOpen ? `block` : `none`};
  width: ${isOpen ? `100vw` : `0`};
  height: ${isOpen ? `100vh` : `0`};
  background: black;
  opacity: 0.2;
  z-index: 11;
`;

export const chatBookmarkModalTransition = (isOpen: boolean) => css`
  position: absolute;
  & > * {
    display: ${isOpen ? `block` : `none`};
  }
  top: 50%;
  left: 50%;
  z-index: 12;
  transform: translate3d(-50%, -50%, 0) scale(${isOpen ? `1` : `0.5`});
  transform-origin: center;
  transform-duration: ${isOpen ? `0.1s` : `0.25s`};
  opacity: ${isOpen ? `1` : `0.5`};
  transition: 0.1s ease-out;
`;

export const chatBookmarkModalBox = css`
  width: 500px;
  max-width: 32rem;
  max-height: 80vh;
  padding: 1.5rem;
  text-align: left;
  vertical-align: middle;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const chatBookmarkModalTitleBox = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const chatBookmarkModalTitle = css`
  margin-right: auto;
`;

export const chatBookmarkModalEditBtn = (isEditing: boolean) => css`
  padding: 0.5rem 1rem;
  margin: 1rem 0.5rem 0 0.5rem;
  border-radius: 0.375rem;
  background: #eee;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const chatBookmarkModalDeleteBtn = css`
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 0;
  color: white;
  border-radius: 0.375rem;
  background: rgba(255, 0, 0, 0.65);
  &:hover {
    background: rgba(255, 0, 0, 0.8);
  }
  justify-self: end;
`;

export const chatBookmarkModalContent = css`
  width: 100%;
  max-height: 63.5vh;
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
  & code {
    font-size: 0.8rem;
  }
  & code span {
    min-width: 0 !important;
  }
  overflow: auto;
  white-space: pre-wrap;
`;

export const chatBookmarkBtnBox = css`
  display: flex;
  justify-content: space-between;
`;

export const chatBookmarkCopyBtn = (isCopied: boolean) => css`
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 0;
  font-weight: 500;
  background-color: ${isCopied ? `rgb(226 232 240)` : `rgb(219 234 254)`};
  border-radius: 0.375rem;
  &:hover {
    background-color: ${isCopied ? `none` : `rgb(191 219 254)`};
  }
  &:focus {
    outline: none;
  }
`;

export const chatBookmarkFormModalBox = css`
  width: 500px;
  max-width: 32rem;
  height: 65vh;
  padding: 1.5rem;
  text-align: left;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const chatBookmarkFormEditBox = css`
  display: flex;
  flex-direction: column;
`;

export const chatBookmarkFormInputBox = css`
  display: flex;
`;

export const chatBookmarkFormTitleInput = (
  titleError: boolean,
  isEditing: boolean
) => css`
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem 0;
  margin: ${isEditing ? `0 0.5rem 0 0.5rem` : `0.5rem 0.5rem 1rem 0.5rem`};
  background: transparent;
  &:focus {
    outline: none;
  }
  border-bottom: ${titleError ? `1px solid red` : `1px solid gray`};
`;

export const chatBookmarkFormInput = (isEditing: boolean) => css`
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.2rem;
  height: calc(65vh - 176px);
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
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
  white-space: pre-wrap;
  cursor: auto;
`;

export const chatBookmarkFormBtn = css`
  padding: 1rem 0;
  border-radius: 0.375rem;
  &:active {
    box-shadow: inset 0 10px 15px -3px rgb(0 0 0 / 0.2),
      0 4px 6px -4px rgb(0 0 0 / 0.2);
  }
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 -2px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 6px -4px rgb(0 0 0 / 0.2);
  &:hover {
    background: #eee;
  }
`;

export const markdownStyle = css`
  & a {
    color: red;
  }
`;
