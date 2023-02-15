import React, { useEffect, useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { CMD_KEY } from '@/utils/const';
import { getSelection } from '@/utils/getSelection';
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
    x: null;
    y: null;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: null;
    y: null;
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
  console.log(state);
  interface Placeholder {
    block: any;
    position: number;
    content: string;
  }

  const addPlaceholder = ({ block, position, content }: Placeholder) => {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
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

  const handleChange = (e: ContentEditableEvent) => {
    setState({ ...state, html: e.target.value });
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
    console.log(e);
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
      console.log('hi');
    }
  };

  const handleMouseUp = () => {
    const block = contentEditable.current;
    getSelection(block);
    console.log('bye');
  };
  console.log('propsId', props.id);
  return (
    <>
      <Draggable key={props.id} draggableId={props.id} index={props.position}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ContentEditable
              innerRef={contentEditable}
              data-position={props.position}
              data-tag={state.tag}
              html={state.html}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onMouseUp={handleMouseUp}
              tagName={state.tag}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};
