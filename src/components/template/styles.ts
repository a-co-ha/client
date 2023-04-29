import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

export const Progress = styled.div`
  width: 5rem;
  height: 1rem;
  background-color: white;
  border: solid;
`;
export const Dealt = styled.div<{ dealt: number }>`
  background-color: red;
  width: ${(props) => props.dealt + '%'};
  height: 100%;
`;
