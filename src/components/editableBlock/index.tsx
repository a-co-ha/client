import { editableBlock } from '../editablePage/types/index';
import React, { useEffect, useState, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef(null);
  const [state, setState] = useState({
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
  useEffect(() => {
    // Add a placeholder if the first block has no sibling elements and no content
    // const hasPlaceholder = this.addPlaceholder({
    //   block: contentEditable.current,
    //   position: props.position,
    //   content: props.html || props.imageUrl,
    // });
    // if (!hasPlaceholder) {
    //   setState({
    //     ...state,
    //     html: props.html,
    //     tag: props.tag,
    //     imageUrl: props.imageUrl,
    //   });
    // }
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
  return (
    <>
      <input type="text" onChange={handleChange} />
    </>
  );
};
