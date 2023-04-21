import { PageNameForm } from '../project-sidebar/PageNameForm';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { Draggable } from 'react-beautiful-dnd';
import type { PageInTemplateProps } from './type';
import { draggable } from '../editable-block/styles';
import * as styles from './styles';

// hover 시 라벨에 태그된 사람목록 보여주기

export const PageInTemplate = ({
  channelId,
  pageId,
  pageName,
  type,
  position,
  label,
}: PageInTemplateProps) => {
  console.log('🚀 ~ file: PageInTemplate.tsx:18 ~ label:', label);
  return (
    <Draggable key={pageId} draggableId={pageId} index={position}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          css={draggable}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div css={styles.progressInPage}>
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
            <div>
              {label.map((person) => (
                <div key={person._id}>{person.content}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
