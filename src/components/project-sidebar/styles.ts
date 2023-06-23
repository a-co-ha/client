import { css } from '@emotion/react';

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const flexRowCenter = css`
  display: flex;
`;

export const projectSideBarBox = (isOpen: boolean) => css`
  ${flexRowCenter}
  width: ${isOpen ? `260px` : `85px`};
  height: calc(100vh - 50px);
  z-index: 1;
  transition: 0.5s;
  transition-delay: ${isOpen ? `0s` : `0.5s`};
  @media screen and (max-width: 450px) {
    position: absolute;
    z-index: 1;
    transform: translate3d(${isOpen ? `0, 0, 0` : `-110%,0,0`});
    background: white;
  }
`;

export const list = css`
  ${flexColumnCenter}
  min-width: 70px;
  height: calc(100vh - 50px);
  padding-top: 1rem;
  z-index: 2;
`;

export const channel = (isOpen: boolean, isMobile: boolean) => css`
  ${flexColumnCenter}
  position: relative;
  width: 260px;
  height: calc(100vh - 50px);
  margin: 0 0.3rem 0.3rem 0;
  z-index: 1;
  transform: translate3d(${isOpen ? `0, 0, 0` : `-100%,0,0`});
  transition: 0.5s;
  transition-delay: ${isOpen ? `0s` : `0.5s`};
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  &:hover > button {
    display: block;
  }
  & > button {
    display: ${isMobile ? `block` : !isMobile && isOpen ? `none` : null};
  }
  & > *:not(button:nth-of-type(1)) {
    opacity: ${isOpen ? `1` : `0`};
    transition: 0.5s;
  }
`;

export const channelSidbarMoreBtn = (isOpen: boolean) => css`
  display: ${isOpen ? `none` : `block`};
  position: ${isOpen ? `absolute` : `fixed`};
  top: 45%;
  left: ${isOpen ? `calc(100% - 10px)` : `100%`};
  width: ${isOpen ? `20px` : `40px`};
  height: ${isOpen ? `60px` : `40px`};
  z-index: 4 !important;
  transform: translate3d(-50%, -50%, 0) ${isOpen ? null : `rotate(180deg)`};
  transition: 0.5s;
  background: ${isOpen ? `transparent` : `white`};
  border: 1px solid ${isOpen ? `rgb(0 0 0 / 0.2)` : `rgb(0 0 0 / 0)`};
  border-right: none;
  border-radius: ${isOpen ? `4px 0 0 4px` : `50%`};
  box-shadow: ${isOpen
    ? undefined
    : `-5px 0 5px -3px rgb(0 0 0 / 0.2),
-6px 0 6px -4px rgb(0 0 0 / 0.2)`};
  line-height: 42px;
  text-indent: ${isOpen ? `0` : `-10px`};
`;

export const pageCreateBtnBox = css`
  display: flex;
  align-items: center;
`;

export const pageCreateBtn = css`
  padding-inline: 12px;
  color: rgb(30 27 75);
  &:hover {
    background-color: rgb(209 213 219);
    height: 2rem;
  }
  border-radius: 8px;
`;

export const projectCreateThumbnail = (
  isSelected: boolean,
  isRead: boolean
) => css`
  position: relative;
  margin-top: 5px;
  border-radius: 10px;
  transform: ${isSelected ? `scale(1.15)` : `scale(1)`};
  transition: 0.3s;
  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
  & > div:nth-of-type(2) {
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: -1;
    width: 95%;
    height: 95%;
    border-radius: 50%;
    box-shadow: 3px 3px 5px 1px rgb(0 0 0 / 0.2),
      3px 2px 8px 1px rgb(0 0 0 / 0.2);
  }
  &:hover {
    transform: ${isSelected ? `scale(1.15)` : `scale(1.08)`};
  }
  &:hover > div {
    display: block;
  }
  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 5px;
    left: -13px;
    width: 5.5px;
    height: 30px;
    background: gray;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    transition: 0.3s;
    transform: scale(${isSelected ? `1` : `0`});
    transform-origin: center;
  }
  &::after {
    display: ${!isRead ? `none` : `block`};
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    transform: translate3d(-200%, -50%, 0);
  }
`;

export const projectThumbnailHoverModal = css`
  display: none;
  position: absolute;
  top: 5%;
  left: 125%;
  min-width: 50px;
  padding: 0.5rem;
  z-index: 2;
  text-align: center;
  color: white;
  background: gray;
  border-radius: 0.375rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: 0.5s;
  white-space: nowrap;
`;

export const projectThumbnailModalLeftArrow = css`
  position: absolute;
  top: 45%;
  left: 0;
  width: 7px;
  height: 7px;
  transform: translate3d(-50%, -50%, 0) rotate(45deg);
  background: gray;
`;

export const projectCreatePlusBtn = css`
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border-radius: 10px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
  border: 1px solid black;
  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
  &:hover > div {
    display: block;
  }
`;
export const listAllDelete = css`
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2);
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

export const pageNameLinkBox = (
  propsPageId: string,
  pageId: string | string[] | undefined,
  isClicked: boolean,
  isRead: boolean,
  type: string
) => css`
  position: relative;
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
  & > div > button {
    display: ${isClicked ? `block` : `none`};
  }
  &::after {
    display: ${type !== `socket`
      ? `none`
      : type === `socket` && isRead
      ? `none`
      : `block`};
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    transform: translate3d(-150%, -50%, 0);
  }
`;

export const pageNameLink = css`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  padding: 0.3rem;
  & > button > svg {
    color: gray;
  }
  & > button:nth-of-type(1) {
    &:hover svg {
      color: #efb925;
    }
  }
  & > button:nth-of-type(2) {
    &:hover svg {
      color: black;
    }
  }
`;

export const pageNameLinkTag = css`
  width: 70%;
  z-index: 2;
`;

export const pageNameBtnStyle = css`
  display: none;
  padding-inline: 0.2rem;
  margin-left: auto;
`;

export const pageNameEditBtn = css`
  ${pageNameBtnStyle};
  z-index: 3;
`;

export const pageNameDeleteBtn = (isClicked: boolean) => css`
  ${pageNameBtnStyle};
  position: relative;
  z-index: 3;
  transform: translate3d(${isClicked ? `120%,0,0` : `0,0,0`});
  transition: 0.3s ease-out;
`;

export const pageNameDeleteConfirmBtn = (isClicked: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 10%;
  right: ${isClicked ? `5%` : `0%`};
  width: ${isClicked ? `50px` : `0px`};
  height: 80%;
  font-size: 0.8rem;
  color: white;
  z-index: ${isClicked ? `3` : `1`};
  background: #ee1f3e;
  border-radius: 4px;
  opacity: ${isClicked ? `1` : `0`};
  transition: 0.3s ease-out;
  &:hover {
    background-color: red;
  }
  & > button {
    width: 100%;
  }
`;
