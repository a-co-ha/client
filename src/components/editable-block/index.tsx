import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CMD_KEY, CMD_NAME_KEY } from '@/utils/const';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import { focusContentEditableTextToEnd } from '@/utils/focusContentEditableTextToEnd';
import TagSelectorMenu from '../selector-menu/selector-tag-menu';
import getCaretCoordinates from '@/utils/getCaretCoordinates';
import * as styles from './styles';
import { api } from '@/pages/api/config/api-config';
import type { StateTypes } from './type';
import type { editableBlock } from '../editable-page/type';

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef<HTMLDivElement | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [state, setState] = useState<StateTypes>({
    htmlBackup: null,
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

  console.log('state', state);
  console.log('props', props);
  //FIXME: 태그가 p가아니면 하위에 해당태그 노드 추가

  const addPlaceholder = () => {
    if (contentEditable.current && contentEditable.current.parentElement) {
      const hasOnlyOneBlock =
        !contentEditable.current.parentElement.nextSibling;
      if (props.html === '' && props.position === 0 && hasOnlyOneBlock) {
        contentEditable.current.innerText = `/ 명령`;
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const hasPlaceholder = addPlaceholder();
    if (hasPlaceholder) {
      setState({ ...state, placeholder: true });
    }

    if (
      contentEditable.current &&
      contentEditable.current.parentElement?.previousElementSibling
    ) {
      contentEditable.current.focus();
    }

    if (contentEditable.current) {
      contentEditable.current.innerText = props.html;
    }
  }, []);

  useEffect(() => {
    props.updateBlock({
      blockId: props.id,
      html: state.html,
      tag: state.tag,
      imgUrl: state.imgUrl, //FIXME: 태그가 img가 아니면 빈값으로 변경
    });
  }, [state.tag]);

  useEffect(() => {
    debugger;
    setState({
      ...state,
      html: props.html,
      tag: props.tag,
      imgUrl: props.imgUrl,
    });
  }, [props]);

  const handleFocus = () => {
    if (state.placeholder) {
      console.log('focus');
      setState({
        ...state,
        html: '',
        placeholder: false,
      });
      if (contentEditable.current) contentEditable.current.innerText = '';
    }
  };

  const handleBlur = () => {
    if (!state.html && !state.imgUrl) {
      addPlaceholder();
      setState({ ...state, placeholder: true });
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
        imgUrl: state.imgUrl,
        ref: contentEditable.current,
      });
    } else if (
      (state.html === '\n' || state.html === '') &&
      e.key === 'Backspace' &&
      contentEditable.current?.parentElement?.previousElementSibling &&
      contentEditable.current?.parentElement?.previousElementSibling
        .childNodes[1].firstChild?.nodeName !== 'IMG'
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
    } else if (e.key === CMD_NAME_KEY) {
      const { x, y } = getCaretCoordinates(true);

      setState({
        ...state,
        tagSelectorMenuPosition: { x: x, y: y },
      });
    }
  };

  const handleTagSelection = async (tag: string) => {
    if (tag === 'img') {
      fileInput.current?.click();
      contentEditable.current?.toggleAttribute('contenteditable');
    } else {
      console.log('태그', tag);
      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0);
        let newNode = document.createElement(tag);
        if (contentEditable.current) {
          newNode.textContent = contentEditable.current.innerText.replace(
            /\/$/,
            ''
          );
          contentEditable.current.innerText = '';
        }

        range.deleteContents();
        range.insertNode(newNode);
        const newRange = document.createRange();
        newRange.setStartAfter(newNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        setState({
          ...state,
          html: state.html.replace(/\/$/, ''),
          tag: tag,
          openTagSelectorMenu: false,
        });
      }
    }
  };

  const closeMenu = () => {
    setState({
      ...state,
      openTagSelectorMenu: false,
    });
  };

  const handleImageDelete = (e: globalThis.MouseEvent) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const target = e.currentTarget as HTMLImageElement;
    target.remove();
    // TODO: 이미지 서버에서 지워주는 api
    contentEditable.current?.toggleAttribute('contenteditable');
    setState({ ...state, tag: 'p', imgUrl: '' });
  };

  const WarningOnHover = () => {
    console.log('클릭 시 이미지가 삭제됩니다');
  };

  const onImageChage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    try {
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      const data = await api.post(`/api/page/images`, {
        formData,
      });

      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0);
        let newNode = document.createElement('img');
        newNode.setAttribute('width', '50%');
        const url = data.data.filePath;
        if (contentEditable.current) contentEditable.current.innerText = '';
        newNode.setAttribute('src', url);
        newNode.addEventListener('contextmenu', handleImageDelete);
        newNode.addEventListener('mouseenter', WarningOnHover);
        range.deleteContents();
        range.insertNode(newNode);
        const newRange = document.createRange();
        newRange.setStartAfter(newNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        setState({
          ...state,
          imgUrl: url,
          // imgUrl: '',
          tag: 'img',
          html: state.html.replace(/\/$/, ''),
          openTagSelectorMenu: false,
        });
      }

      props.addBlock({
        id: props.id,
        html: state.html,
        tag: state.tag,
        imgUrl: state.imgUrl,
        ref: contentEditable.current,
      });
    } catch {
      console.log('에러');
    }
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
                css={styles.block(snapshot.isDragging, snapshot.dropAnimation)}
                data-position={props.position}
                data-tag={state.tag}
                onInput={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={onImageChage}
              />
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};
