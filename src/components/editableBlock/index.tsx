import { editableBlock } from '../editablePage/types/index';
export const EditableBlock = (props: editableBlock) => {
  console.log('props', props.id);
  return (
    <div>
      {props.id}
      에디터블 블락
    </div>
  );
};
