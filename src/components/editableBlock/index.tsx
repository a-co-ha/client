import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { CMD_KEY } from '@/utils/const';
import { getSelection } from '@/utils/getSelection';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import type { editableBlock } from '../editablePage/types';

interface StateTypes {
  htmlBackup: null | string;
  html: string;
  tag: string;
  imageUrl: string;
  placeholder: boolean;
  previousKey: null | string;
  isTyping: boolean;
  tagSelectorMenuOpen: boolean;
  tagSelectorMenuPosition: {
    x: null | number;
    y: null | number;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: null | number;
    y: null | number;
  };
}

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef(null);
  const [state, setState] = useState<StateTypes>({
    htmlBackup: null,
    html: '',
    tag: 'p',
    imageUrl: '',
    placeholder: false,
    previousKey: null,
    isTyping: false,
    tagSelectorMenuOpen: false,
    tagSelectorMenuPosition: {
      x: null,
      y: null,
    },
    actionMenuOpen: false,
    actionMenuPosition: {
      x: null,
      y: null,
    },
  });
  //
  interface Placeholder {
    block: any;
    position: number;
    content: string;
  }

  const addPlaceholder = ({ block, position, content }: Placeholder) => {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block?.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      setState({
        ...state,
        html: 'Type a page title...',
        tag: 'h1',
        imageUrl: '',
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // Add a placeholder if the first block has no sibling elements and no content
    const hasPlaceholder = addPlaceholder({
      block: contentEditable.current,
      position: props.position,
      content: props.html || props.imageUrl,
    });
    if (!hasPlaceholder) {
      setState({
        ...state,
        html: props.html,
        tag: props.tag,
        imageUrl: props.imageUrl,
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    setState({ ...state, html: e.target.innerText });
  };

  // const handleFocus = () => {
  //   // If a placeholder is set, we remove it when the block gets focused
  //   if (state.placeholder) {
  //     setState({
  //       ...state,
  //       html: '',
  //       placeholder: false,
  //       isTyping: true,
  //     });
  //   } else {
  //     setState({ ...state, isTyping: true });
  //   }
  // };

  // const handleBlur = (e: React.MouseEventHandler) => {
  //   // Show placeholder if block is still the only one and empty
  //   const hasPlaceholder = this.addPlaceholder({
  //     block: contentEditable.current,
  //     position: props.position,
  //     content: state.html || state.imageUrl,
  //   });
  //   if (!hasPlaceholder) {
  //     setState({ ...state, isTyping: false });
  //   }
  // };
  /**
 * ref: any;
        onInput: (originalEvt: React.SyntheticEvent<any, Event>) => void;
        onBlur: React.FocusEventHandler<HTMLDivElement>;
        onKeyUp: React.KeyboardEventHandler<HTMLDivElement>;
        onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
        contentEditable: boolean;
        dangerouslySetInnerHTML: {
            __html: string;
        };
 */

  const handleFocus = () => {
    // If a placeholder is set, we remove it when the block gets focused
    if (state.placeholder) {
      setState({
        ...state,
        html: '',
        placeholder: false,
        isTyping: true,
      });
    } else {
      setState({ ...state, isTyping: true });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Show placeholder if block is still the only one and empty
    const hasPlaceholder = addPlaceholder({
      block: contentEditable.current,
      position: props.position,
      content: state.html || state.imageUrl,
    });
    if (!hasPlaceholder) {
      setState({ ...state, isTyping: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === CMD_KEY) {
      // If the user starts to enter a command, we store a backup copy of
      // the html. We need this to restore a clean version of the content
      // after the content type selection was finished.
      setState({ ...state, htmlBackup: state.html });
    } else if (e.key === 'Backspace' && !state.html) {
      props.deleteBlock(props.id);
    } else if (
      e.key === 'Enter' &&
      state.previousKey !== 'Shift' &&
      !state.tagSelectorMenuOpen
    ) {
      // If the user presses Enter, we want to add a new block
      // Only the Shift-Enter-combination should add a new paragraph,
      // i.e. Shift-Enter acts as the default enter behaviour
      e.preventDefault();
      props.addBlock({
        id: props.id,
        html: state.html,
        tag: state.tag,
        imageUrl: state.imageUrl,
        ref: contentEditable.current,
      });
    }
    // We need the previousKey to detect a Shift-Enter-combination
    setState({ ...state, previousKey: e.key });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === CMD_KEY) {
    }
  };

  const handleMouseUp = () => {
    const block = contentEditable.current;
    getSelection(block);
  };

  // drag
  const calculateActionMenuPosition = (parent: any, initiator: string) => {
    switch (initiator) {
      // case "TEXT_SELECTION":
      //   const { x: endX, y: endY } = getCaretCoordinates(false); // fromEnd
      //   const { x: startX, y: startY } = getCaretCoordinates(true); // fromStart
      //   const middleX = startX + (endX - startX) / 2;
      //   return { x: middleX, y: startY };
      case 'DRAG_HANDLE_CLICK':
        const x =
          parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
        const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;
        return { x: x, y: y };
      default:
        return { x: null, y: null };
    }
  };
  const closeActionMenu = () => {
    setState({
      ...state,
      actionMenuPosition: { x: null, y: null },
      actionMenuOpen: false,
    });
    document.removeEventListener('click', closeActionMenu, false);
  };

  const openActionMenu = (parent: EventTarget, trigger: string) => {
    const { x, y } = calculateActionMenuPosition(parent, trigger);
    setState({
      ...state,
      actionMenuPosition: { x: x, y: y },
      actionMenuOpen: true,
    });
    // Add listener asynchronously to avoid conflicts with
    // the double click of the text selection
    setTimeout(() => {
      document.addEventListener('click', closeActionMenu, false);
    }, 100);
  };
  const handleDragHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const dragHandle = e.target;
    openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
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
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onMouseUp={handleMouseUp}
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
