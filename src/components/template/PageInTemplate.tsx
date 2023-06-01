import { PageNameForm } from '../project-sidebar/PageNameForm';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { Draggable } from 'react-beautiful-dnd';
import type { Labels, PageInTemplateProps } from './type';
import { draggable } from '../editable-block/styles';
import * as styles from './styles';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

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
              {
                label
                  .slice(0, 2)
                  .map((person: Labels | string, index: number) => (
                    <div key={index} css={styles.d}>
                      {typeof person === 'string' ? person : person.content}
                    </div>
                  ))}
              {label.length > 2 && (
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>...</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        {label
                          .slice(2)
                          .map((person: Labels | string, index: number) => (
                            <div key={index} css={styles.d}>
                              {typeof person === 'string'
                                ? person
                                : person.content}
                            </div>
                          ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
