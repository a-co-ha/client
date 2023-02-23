import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { CMD_KEY } from '@/utils/const';
import { getSelection } from '@/utils/getSelection';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import type { editableBlock } from '../editablePage/types';
import { focusContentEditableTextToEnd } from '@/utils/focusContentEditableTextToEnd';

interface StateTypes {
  htmlBackup: null | string;
  html: string;
  tag: string;
  imageUrl: string;
  previousKey: null | string;
  isTyping: boolean;
  placeholder: boolean;
}

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState<StateTypes>({
    htmlBackup: null,
    html: '',
    tag: 'p',
    imageUrl: '',
    previousKey: null,
    isTyping: false,
    placeholder: false,
  });
  console.log('props', props);
  console.log('state', state);

  const handleFocus = () => {
    if (state.placeholder) {
      setState({
        ...state,
        html: '',
        isTyping: true,
        placeholder: false,
      });
      if (contentEditable.current) contentEditable.current.innerText = '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    setState((prevState) => ({
      ...prevState,
      html: e.target.innerText,
    }));

    if (contentEditable.current)
      focusContentEditableTextToEnd(contentEditable.current);
  };

  const handleDragHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // const dragHandle = e.target;
    // openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
  };
  const addPlaceholder = () => {
    if (props.html === '') return true;
    return false;
  };

  useEffect(() => {
    const hasPlaceholder = addPlaceholder();
    if (hasPlaceholder) {
      setState({ ...state, placeholder: true });
      // if (contentEditable.current) contentEditable.current.innerText = 'dafs';
    }
    // contentEditable.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && state.previousKey === 'Shift') {
      console.log('shift + enter');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) {
        return;
      }
      props.addBlock({
        id: props.id,
        html: state.html,
        tag: state.tag,
        imageUrl: state.imageUrl,
        ref: contentEditable.current,
      });
    } else if (e.key === 'Backspace' && !state.html) {
      props.deleteBlock(props.id);
    }
    if (state.previousKey === 'Shift') return;

    setState({ ...state, previousKey: e.key });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Shift') state.previousKey = null;
  };

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
                onInput={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                placeholder="가나다라마"
              />
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
