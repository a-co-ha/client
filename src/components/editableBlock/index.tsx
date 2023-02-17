import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { CMD_KEY } from '@/utils/const';
import { getSelection } from '@/utils/getSelection';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import type { editableBlock } from '../editablePage/types';
import { stat } from 'fs';

interface StateTypes {
  htmlBackup: null | string;
  html: string;
  tag: string;
  imageUrl: string;
  previousKey: null | string;
  isTyping: boolean;
}

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef(null);

  const [state, setState] = useState<StateTypes>({
    htmlBackup: null,
    html: '',
    tag: 'p',
    imageUrl: '',
    previousKey: null,
    isTyping: false,
  });
  console.log(props);
  console.log(state);

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    setState({ ...state, html: e.target.innerText });
  };

  const handleFocus = () => {
    setState({
      ...state,
      html: '',
      isTyping: true,
    });
  };

  const handleDragHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // const dragHandle = e.target;
    // openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
  };
  const addPlaceholder = () => {
    if (props.position === 0 && props.html === '') return true;
    return false;
  };

  useEffect(() => {
    const hasPlaceholder = addPlaceholder();
    if (hasPlaceholder) {
      setState({ ...state, html: 'dsafa' });
    }
  }, []);

  const handleKeyDown = () => {};

  return (
    <>
      {props.id && (
        <Draggable key={props.id} draggableId={props.id} index={props.position}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              css={draggable}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                contentEditable
                suppressContentEditableWarning
                ref={contentEditable}
                key={props.id}
                css={block}
                data-position={props.position}
                data-tag={state.tag}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
              >
                {state.html}
              </div>
              <span
                css={dragHandle}
                role="button"
                tabIndex={0}
                onClick={handleDragHandleClick}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Image src={DragHandleIcon} alt="Icon" />
              </span>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

const draggable = css`
  display: block;
  &:hover {
    span {
      opacity: 1;
    }
  }
`;

const dragHandle = css`
  opacity: 0;
  display: inline-block;
  width: 1rem;
  img {
    display: block;
    margin: auto;
  }
`;
const block = css`
  display: inline-block;
  width: calc(100% - 1rem);
  padding: 0.25rem;
  -webkit-user-select: text;
  user-select: text;
  outline: 2px solid limegreen;
  padding: 10px;
  margin: 1px;
`;
