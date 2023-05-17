import { css } from '@emotion/react';
import { chatBookmarkModalContent } from '../chat-bookmark/styles';
import { inviteModalShareBtn } from '../navbar/styles';

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
`;

export const commonBoxStyle = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  min-height: 300px;
  margin: 0 auto;
`;

export const commonTitleStyle = css`
  text-align: left;
`;

export const commitLogBox = css`
  ${commonBoxStyle};
  width: 300px;
`;

export const commitLogTitleBox = css`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  align-items: center;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8015800070028012) 0%,
    rgba(143, 143, 143, 0.9033189033189033) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border-top-left-radius: 0.37rem;
  border-top-right-radius: 0.37rem;
`;

export const commitLogTitle = css`
  ${commonTitleStyle};
  font-weight: 500;
`;

export const commitLogInnerBox = (
  isConnected: boolean,
  isError?: boolean
) => css`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  &::after {
    display: ${!isConnected || isError ? `flex` : `none`};
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  &:hover::after {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const commitLogPlusBtnBox = css`
  padding-top: 3rem;
`;

export const commitLogPlusAndErrorMessage = css`
  font-size: 0.8rem;
  padding-top: 1rem;
`;

export const commitLogItemAlign = css`
  height: 100%;
`;

export const commitLogItemBox = css`
  position: relative;
  height: 100%;
  outline: 1px solid red;
  overflow: hidden;
`;

export const commitLogItem = css`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const commitLogLine = css`
  display: inline-block;
  position: absolute;
  top: 6px;
  left: 4px;
  width: 2px;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const commitLogSphere = css`
  display: inline-block;
  position: relative;
  width: 8px;
  height: 8px;
  padding: 4px;
  border: 1px solid white;
  background: rgba(0, 0, 255, 1);
  border-radius: 50%;
`;

export const commitLogLink = css`
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  border-radius: 0.375rem;
`;

export const commitLogMessage = css`
  font-size: 0.7rem;
`;

export const commitLogBranch = css`
  font-size: 0.7rem;
`;

export const commitLogTime = css`
  font-size: 0.7rem;
`;

export const commitLogAuthor = css`
  font-size: 0.7rem;
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
  max-height: auto;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  overflow: scroll;
  white-space: pre-wrap;
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
  // position: relative;
  width: 500px;
  height: 65vh;
  padding: 1.5rem;
  text-align: left;
  background: white;
  border-radius: 1rem;
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

export const commitLogModalBtn = css`
  display: flex;
  align-itmes: center;
  gap: 10px;

  padding: 14px 24px;
  margin-right: 0.3rem;
  color: black;
  font-weight: 600;
  vertical-align: middle;
  border-radius: 0.375rem;
  background: white;
  appearance: none;
  cursor: pointer;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 -2px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 6px -4px rgb(0 0 0 / 0.2);

  &:hover {
    color: white;
    background: rgba(255, 0, 0, 0.8);
  }

  &::before {
    content: '';
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.7);
    transition: border 0.2s linear;
  }
  &::after {
    content: attr(aria-label);
  }

  &:checked {
    color: white;
    background-color: rgba(255, 0, 0, 0.8);
    border-color: rgba(255, 0, 0, 0.8);
  }
  &:checked::before {
    border: 4px solid white;
    background-color: rgba(255, 0, 0, 0.4);
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

export const ItemBox = css`
  ${chatBookmarkModalContent}
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  height: 44.5vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ItemBoxPadding = css`
  padding-right: 0.5rem;
`;

export const orgItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0.1rem;
  border-radius: 0.375rem;
  &:hover {
    outline: 0.1px solid gray;
  }
  &:focus {
    background: #ffd6dc;
    outline: none;
  }
  transition: 0.2s;
`;

export const orgName = css`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

export const orgDesc = css`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

export const commitLogSubmitBtn = (isFocus: boolean) => css`
  position: absolute;
  bottom: 1.5rem;
  width: calc(100% - 3rem);
  padding: 1rem 0;
  color: ${isFocus ? `white` : `#ddd`};
  font-weight: 600;
  background: ${isFocus ? `rgba(248, 93, 117, 0.9)` : `white`};
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 -2px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 6px -4px rgb(0 0 0 / 0.2);
  &:hover {
    background: ${isFocus ? `rgba(248, 93, 117, 1)` : `white`};
  }
  user-select: ${isFocus ? `auto` : `none`};
`;

export const errorMessage = css`
  padding: 1rem;
  text-align: center;
  color: rgb(0 0 0 /0.2);
  user-select: none;
`;

export const helpModal = css`
  display: inline-block;
  position: relative;
  &:hover div {
    display: block;
  }
`;

export const helpModalContent = (direction: string | undefined) => css`
  display: none;
  position: absolute;
  left: ${direction === 'left' ? '-200px' : `0`};
  min-width: 200px;
  padding: 1rem;
  margin: 0.5rem 0 0 0;
  font-size: 0.8rem;
  line-height: 1.2rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 -2px 5px -3px rgb(0 0 0 / 0.2),
    0 4px 6px -4px rgb(0 0 0 / 0.2);
  white-space: pre-wrap;
`;

export const confirmModalBackground = (isOpen: boolean) => css`
  ${commitLogModalBackground(isOpen)};
  z-index: 13;
`;

export const confirmModalTransition = (isOpen: boolean) => css`
  ${commitLogModalTransition(isOpen)};
  z-index: 14;
`;

export const confimModalBox = css`
  position: relative;
  width: 70vw;
  height: 20vh;
  padding: 1.5rem;
  text-align: left;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const confirmModalContent = css`
  padding: 1.5rem;
  font-weight: 500;
`;

export const confirmModalBtnAlign = css`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
`;

export const confirmModalConfirmBtn = css`
  ${inviteModalShareBtn};
`;

export const confirmModalCancelBtn = css`
  ${inviteModalShareBtn};
  margin-left: 0;
  background: rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
