import { css } from '@emotion/react';
import { DropAnimation } from 'react-beautiful-dnd';

export const draggable = css`
  display: block;
  &:hover {
    span {
      opacity: 1;
    }
  }
`;

export const dragHandle = css`
  opacity: 0;
  display: inline-block;
  width: 1rem;
  img {
    display: block;
    margin: auto;
  }
`;
export const block = (
  isDragging: boolean,
  dropAnimating: DropAnimation | undefined | null,
  hasPlaceholder: boolean
) => css`
  display: inline-block;
  width: calc(100% - 1.2rem);
  padding: 0.25rem;
  margin: 1px;
  background-color: ${isDragging ? '#F5F6FB' : null};
  outline: ${dropAnimating ? '2px solid limegreen' : null};
  -webkit-user-select: text;
  user-select: text;
  opacity: ${hasPlaceholder ? '0.5' : ''};
`;

export const imgStyle = () => css`
  width: 100%;
`;
