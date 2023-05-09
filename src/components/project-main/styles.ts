import { css } from '@emotion/react';

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
`;

export const contentBox = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: auto;
  margin: 0 auto;
  outline: 1px solid red;
`;

export const contentBoxTitle = css`
  text-align: left;
`;

export const content = css`
  height: 150px;
  border: 1.5px solid gray;
  border-radius: 4px;
`;

export const main = css`
  display: flex;
`;

export const mainContentBox = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
`;

export const commitLogModalBackground = (isOpen: boolean) => css`
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

export const commitLogModalTransition = (isOpen: boolean) => css`
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

export const commitLogModalFormBox = css`
  width: 500px;
  max-width: 32rem;
  height: 65vh;
  padding: 1.5rem;
  text-align: left;
  background: white;
  border-radius: 1rem;
  // overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const commitLogFormBox = css`
  display: flex;
  flex-direction: column;
`;

export const commitLogFormAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const commitLogModalOrgBtn = css`
  padding: 0.5rem 1rem;
  margin-right: 0.3rem;
  color: white;
  border-radius: 0.375rem;
  vertical-align: middle;
  background: rgba(255, 0, 0, 0.65);
  &:hover {
    background: rgba(255, 0, 0, 0.8);
  }
`;

export const commitLogModalRepoBtn = css`
  padding: 0.5rem 1rem;
  margin-right: 0.3rem;
  color: white;
  border-radius: 0.375rem;
  vertical-align: middle;
  background: rgba(255, 0, 0, 0.65);
  &:hover {
    background: rgba(255, 0, 0, 0.8);
  }
`;

export const commitLogRepoLabel = css`
  margin-left: 1rem;
`;

export const commitLogFormTitleInput = (titleError: boolean) => css`
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem 0;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  background: transparent;
  &:focus {
    outline: none;
  }
  border-bottom: ${titleError ? `1px solid red` : `1px solid gray`};
`;

export const commitLogFormBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 40px;
  padding: 1rem 0;
  margin-left: 1rem;
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

export const orgItemBox = css`
  display: flex;
  margin-top: 1rem;
`;

export const orgItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    outline: 0.1px solid gray;
  }
  &:focus {
    background: #ffd6dc;
  }
  transition: 0.3s;
`;

export const orgName = css`
  margin-left: 0.5rem;
`;

export const errorMessage = css`
  padding: 1rem;
  text-align: center;
  color: rgb(0 0 0 /0.2);
  user-select: none;
`;

export const helpModal = css`
  position: relative;
  &:hover div {
    display: block;
  }
`;

export const helpModalContent = css`
  display: none;
  position: absolute;
  left: 0;
  min-width: 200px;
  padding: 1rem;
  margin: 0.5rem 0 0 0;
  font-size: 0.8rem;
  line-height: 1.2rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 -2px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 6px -4px rgb(0 0 0 / 0.2);
`;
