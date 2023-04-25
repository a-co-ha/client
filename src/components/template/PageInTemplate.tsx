import { PageNameForm } from '../project-sidebar/PageNameForm';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { Draggable } from 'react-beautiful-dnd';
import type { Labels, PageInTemplateProps } from './type';
import { draggable } from '../editable-block/styles';
import * as styles from './styles';

export const PageInTemplate = ({
  channelId,
  pageId,
  pageName,
  type,
  position,
  label,
}: PageInTemplateProps) => {
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
              type={type}
            />
            <PageNameLink
              channelId={channelId}
              pageId={pageId}
              pageName={pageName}
              type={type}
            />
            <div>
              {label.map((person: Labels | string) => (
                <div key={typeof person === 'string' ? person : person._id}>
                  {typeof person === 'string' ? person : person.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
