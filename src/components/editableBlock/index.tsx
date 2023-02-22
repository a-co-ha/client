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
    }
  };

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    console.log(e);
    // 입력 시 change event가 아니라 input event가 동작한다.
    // 또한, input이 아니기 때문에 value 값이 없다.
    // 이 때문에 제어 컴포넌트처럼 리액트가 DOM을 제어할 수가 없다.
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
    if (props.position === 0 && props.html === '') return true;
    return false;
  };

  // const simulateEnterKey = () => {
  //   const event = new KeyboardEvent('keypress', { key: 'Enter' });
  //   console.log('simulateEnterKey', event);
  //   contentEditable.current?.dispatchEvent(event);
  // };

  useEffect(() => {
    const hasPlaceholder = addPlaceholder();
    if (hasPlaceholder) {
      //html에 빈값이 처음부터 들어와서  placeholder가 나오지 않음
      setState({ ...state, html: '제목 없음', placeholder: true });
    }

    contentEditable.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && state.previousKey === 'Shift') {
      console.log('shift + enter');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (contentEditable.current) {
        setState({ ...state, html: contentEditable.current.innerText });

        // const arrowRightEvent = new KeyboardEvent('keydown', {
        //   key: 'ArrowRight',
        //   bubbles: true,
        // });
        // contentEditable.current.dispatchEvent(arrowRightEvent);

        props.addBlock({
          id: props.id,
          html: state.html,
          tag: state.tag,
          imageUrl: state.imageUrl,
          ref: contentEditable.current,
        });
      }
    } else if (e.key === 'Backspace' && !state.html) {
      // FIXME: state.html에 값이 업데이트되지 않아 이벤트 발생시 블럭 지워짐 istyping으로 해결하기
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
