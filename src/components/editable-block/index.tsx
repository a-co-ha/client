import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  MouseEvent,
} from 'react';
import { css } from '@emotion/react';
import { Draggable } from 'react-beautiful-dnd';
import { CMD_KEY, CMD_NAME_KEY } from '@/utils/const';
import Image from 'next/image';
import DragHandleIcon from '@/images/draggable.svg';
import { focusContentEditableTextToEnd } from '@/utils/focusContentEditableTextToEnd';
import TagSelectorMenu from '../selector-menu/selector-tag-menu';
import getCaretCoordinates from '@/utils/getCaretCoordinates';
import type { editableBlock } from '../editable-page/types';
import type { StateTypes } from './type';
import { api } from '@/api/api-config';

export const EditableBlock = (props: editableBlock) => {
  const contentEditable = useRef<HTMLDivElement | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<StateTypes>({
    htmlBackup: null,
    html: '',
    tag: 'p',
    imageUrl: null,
    previousKey: null,
    placeholder: false,
    openTagSelectorMenu: false,
    tagSelectorMenuPosition: {
      x: 0,
      y: 0,
    },
  });
  console.log('props', props);
  console.log('state', state);

  const addPlaceholder = () => {
    if (contentEditable.current && contentEditable.current.parentElement) {
      const hasOnlyOneBlock =
        !contentEditable.current.parentElement.nextSibling;
      if (props.html === '' && props.position === 0 && hasOnlyOneBlock) {
        contentEditable.current.innerText = `@는 태그, /는 명령`;
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
  }, []);

  useEffect(() => {
    props.updateBlock({
      _id: props.id,
      html: state.html,
      tag: state.tag,
      imageUrl: state.imageUrl, //FIXME: 태그가 img가 아니면 빈값으로 변경
    });
  }, [state.tag]);

  const handleFocus = () => {
    if (state.placeholder) {
      setState({
        ...state,
        html: '',
        placeholder: false,
      });
      if (contentEditable.current) contentEditable.current.innerText = '';
    }
  };

  const handleBlur = () => {
    if (!state.html && !state.imageUrl) {
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

  const handleDragHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // const dragHandle = e.target;
    // openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
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
        imageUrl: state.imageUrl,
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
    console.log('실행');
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

  const handleImageDelete = (e: React.MouseEvent): void => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    e.currentTarget.remove();
    // TODO: 이미지 서버에서 지워주는 api
    contentEditable.current?.toggleAttribute('contenteditable');
    setState({ ...state, tag: 'p', imageUrl: null });
  };

  const WarningOnHover = () => {
    console.log('클릭 시 이미지가 삭제됩니다');
  };

  const onImageChage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    const pageId = props.pageId;
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const data = await api.post(`/post/images/${pageId}?channel=1`, {
        formData,
      });

      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0);
        let newNode = document.createElement('img');
        newNode.setAttribute('width', '50%');
        const url = reader.result as string;
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
      }
      setState({
        ...state,
        imageUrl: reader.result,
        tag: 'img',
        html: state.html.replace(/\/$/, ''),
        openTagSelectorMenu: false,
      });
      props.addBlock({
        id: props.id,
        html: state.html,
        tag: state.tag,
        imageUrl: state.imageUrl,
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
              css={draggable}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
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

// const blocks = css `{
//   padding: 0. 25rem;
//   // Better support for safari
//   -webkit-user-select: text;
//   user-select: text;
// `

// const blocks:focus,
// const isDragging,
// const blocksSelected = css `{
//   background: $tertiary;
//   outline-color: $tertiary;
//   & ~ . dragHandle {
//     opacity: 1;
//   }
// `

// const placeholder = css `
//   color: rgba(72, 72, 72, 0.25);
// `

// const draggable .blocks = css `
//   display: inline-block;
//   width: calc(100% - 1rem);
// `
