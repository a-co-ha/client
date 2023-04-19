import { PageNameForm } from '../project-sidebar/PageNameForm';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { Draggable } from 'react-beautiful-dnd';
import type { PageInTemplateProps } from './type';
import * as styles from '../editable-block/styles';

// hover 시 라벨에 태그된 사람목록 보여주기

export const PageInTemplate = ({
  channelId,
  pageId,
  pageName,
  type,
  position,
}: PageInTemplateProps) => {
  return (
    <>
      <Draggable key={pageId} draggableId={pageId} index={position}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            css={styles.draggable}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <PageNameForm
              channelId={channelId}
              pageId={pageId}
              pageName={pageName}
            />
            <PageNameLink
              channelId={channelId}
              pageId={pageId}
              pageName={pageName}
              type={type}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};
