import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CMD_KEY } from '@/utils/const';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import { focusContentEditableTextToEnd } from '@/utils/focusContentEditableTextToEnd';
import TagSelectorMenu from '../selector-menu/selector-tag-menu';
import getCaretCoordinates from '@/utils/getCaretCoordinates';
import * as styles from './styles';
import { postImage } from '@/pages/api/editable/postImage';
import { createNode } from '@/utils/createNode';
import { createImageNode } from '@/utils/createImageNode';
import type { StateTypes } from './type';
import type { editableBlock } from '../editable-page/type';
import useDidMountEffect from '@/hooks/useDidMountEffect';

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef<HTMLDivElement | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<StateTypes>({
    html: '',
    tag: 'p',
    imgUrl: '',
    previousKey: null,
    placeholder: false,
    openTagSelectorMenu: false,
    tagSelectorMenuPosition: {
      x: 0,
      y: 0,
    },
  });

  const addPlaceholder = () => {
    if (contentEditable.current && contentEditable.current.parentElement) {
      const hasOnlyOneBlock =
        !contentEditable.current.parentElement.nextSibling;
      if (props.html === '' && props.position === 0 && hasOnlyOneBlock) {
        contentEditable.current.innerText = `/ 명령메뉴 열기`;
        setState({ ...state, placeholder: true });
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const hasPlaceholder = addPlaceholder();
    if (hasPlaceholder) {
      return;
    } else {
      if (contentEditable.current) {
        contentEditable.current.innerText = props.html;
        if (contentEditable.current.parentElement?.previousElementSibling) {
          contentEditable.current.focus();
        }
      }

      if (props.tag !== 'p' && !props.imgUrl) {
        createNode(contentEditable, props.tag);
      } else if (props.imgUrl) {
        createImageNode(contentEditable, props.imgUrl);
      }

      setState({
        ...state,
        html: props.html,
        tag: props.tag,
        imgUrl: props.imgUrl,
      });
    }
  }, []);
  useDidMountEffect(() => {
    props.updateBlock({
      blockId: props.id,
      html: state.html,
      tag: state.tag,
      imgUrl: state.imgUrl,
    });
  }, [state.tag]);

  const handleFocus = () => {
    if (state.placeholder) {
      if (contentEditable.current) contentEditable.current.innerText = '';
      setState({
        ...state,
        html: '',
        placeholder: false,
      });
    }
  };

  const handleBlur = () => {
    if (!state.html && !state.imgUrl) {
      addPlaceholder();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    setState((prevState) => ({
      ...prevState,
      html: e.target.innerText,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && state.previousKey === 'Shift') {
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) {
        return;
      }

      props.addBlock({
        id: props.id,
        html: state.html,
        tag: state.tag,
        imgUrl: state.imgUrl,
        ref: contentEditable.current,
      });
    } else if (
      (state.html === '\n' || state.html === '') &&
      e.key === 'Backspace' &&
      contentEditable.current?.parentElement?.previousElementSibling
    ) {
      e.preventDefault();

      props.deleteBlock(props.id);
      if (contentEditable.current && contentEditable.current.parentElement) {
        const prevBlock = contentEditable.current.parentElement
          .previousElementSibling.childNodes[1] as HTMLDivElement;
        focusContentEditableTextToEnd(prevBlock);
      }
    }
    if (state.previousKey === 'Shift') return;
    setState({ ...state, previousKey: e.key });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Shift') state.previousKey = null;
    else if (e.key === CMD_KEY) {
      const { x, y } = getCaretCoordinates(true);

      setState({
        ...state,
        tagSelectorMenuPosition: { x: x, y: y },
        openTagSelectorMenu: true,
      });
    }
  };

  const handleTagSelection = async (tag: string) => {
    if (tag === 'img') {
      fileInput.current?.click();
    } else {
      createNode(contentEditable, tag);

      setState({
        ...state,
        html: state.html.replace(/\/$/, ''),
        tag: tag,
        openTagSelectorMenu: false,
      });
    }
  };

  const closeMenu = () => {
    contentEditable.current?.focus();
    setState({
      ...state,
      openTagSelectorMenu: false,
    });
  };

  const handleImageClick = () => {
    if (
      contentEditable.current &&
      contentEditable.current.firstElementChild?.tagName === 'IMG'
    ) {
      const imgNode = contentEditable.current.firstElementChild;
      if (imgNode.getAttribute('style') === 'width: 100%') {
        imgNode.removeAttribute('style');
      } else {
        imgNode.setAttribute('style', 'width: 100%');
      }
    }
  };

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    try {
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      const filePath = await postImage(formData);
      createImageNode(contentEditable, filePath);

      setState({
        ...state,
        imgUrl: filePath,
        tag: 'img',
        html: state.html.replace(/\/$/, ''),
        openTagSelectorMenu: false,
      });
    } catch (err) {}
  };

  return (
    <>
      {state.openTagSelectorMenu && (
        <TagSelectorMenu
          position={state.tagSelectorMenuPosition}
          handleTagSelection={handleTagSelection}
          closeMenu={closeMenu}
        />
      )}
      {props.id && (
        <Draggable key={props.id} draggableId={props.id} index={props.position}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              css={styles.draggable}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <span
                css={styles.dragHandle}
                role="button"
                tabIndex={0}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Image src={DragHandleIcon} alt="Icon" />
              </span>
              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                ref={contentEditable}
                key={props.id}
                css={styles.block(
                  snapshot.isDragging,
                  state.placeholder
                )}
                data-position={props.position}
                data-tag={state.tag}
                onInput={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                onClick={handleImageClick}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={imageUpload}
              />
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};
