import { css, keyframes } from '@emotion/react';

const guideArrowAni = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

const guideMainAni = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

export const guideBox = css`
  position: relative;
  width: calc(100% - 70px);
  padding: 1rem 2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
  & p {
    @media screen and (max-width: 361px) {
      font-size: 0.9rem;
    }
  }
`;

export const guideArrow = css`
  position: absolute;
  top: 10%;
  left: -2.25rem;
  width: 5px;
  height: 45px;
  background: gray;
  border-radius: 4px;
  opacity: 0;
  transform: translate3d(0, 30%, 0);
  animation: ${guideArrowAni} 4s infinite;
  &::before {
    position: absolute;
    top: -0.1rem;
    left: -0.4rem;
    content: '';
    width: 5px;
    height: 20px;
    background: gray;
    border-radius: 4px;
    transform: rotate(45deg);
  }
  &::after {
    position: absolute;
    top: -0.1rem;
    left: 0.4rem;
    content: '';
    width: 5px;
    height: 20px;
    background: gray;
    border-radius: 4px;
    transform: rotate(-45deg);
  }
`;

export const guideImageAlign = css`
  display: flex;
  opacity: 0;
  transform: translate3d(0, 20%, 0);
  animation: ${guideMainAni} 2s forwards;
  @media screen and (min-width: 1280px) {
    margin: 0 auto;
    width: 50%;
  }
`;

export const guideTitle = css`
  white-space: pre-wrap;
  @media screen and (max-width: 361px) {
    font-size: 1.6rem;
  }
`;

export const guideImageBox = css`
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  & > img {
    object-fit: contain;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    @media screen and (max-width: 540px) {
      width: 62px;
      height: 62px !important;
    }
    @media screen and (max-width: 361px) {
      width: 41.5px;
      height: 41.5px !important;
    }
  }
`;

export const guideMainBox = css`
  padding: 1rem 0;
  opacity: 0;
  transform: translate3d(0, 20%, 0);
  animation: ${guideMainAni} 2s 0.5s forwards;
  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      margin: 0 auto;
      width: 50%;
    }
  }
`;

export const guideMainItem = css`
  margin-bottom: 1rem;
  border-radius: 4px;
`;
export const mainItemDesc = css`
  &:hover > span {
    transition: 0.5s;
    color: #e67384;
  }
`;

export const mainItemSpan = css`
  color: #e67384;
  font-weight: 500;
`;

export const mainItemDescSpan = css`
  font-weight: 500;
`;

export const guideMainTagBox = css`
  display: flex;

  & > span {
    padding: 0.2vh 1vh;
    margin: 0 0.25rem 0.25rem 0.25rem;
    color: white;
    font-weight: 500;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    @media screen and (max-width: 361px) {
      font-size: 0.8rem;
    }
  }
  & > span:nth-of-type(1) {
    margin-left: 0;
  }
`;
