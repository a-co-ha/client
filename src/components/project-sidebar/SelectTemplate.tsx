import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { usePostEditablePage } from '@/hooks/queries/editable/postPage';
import { usePostSocketPage } from '@/hooks/queries/socket/postPage';
import { useCreateTemplate } from '@/hooks/queries/template/useCreateTemplate';
import { SelectTemplateProps } from './type';
import { Icon } from './Icons';

export const SelectTemplate = ({ pageType }: SelectTemplateProps) => {
  const { mutate: postEditablePageMutate } = usePostEditablePage();
  const { mutate: createTemplateMutate } = useCreateTemplate();
  const { mutate: postSocketPageMutate } = usePostSocketPage();
  const templates =
    pageType === 'EditablePage'
      ? [
          {
            name: '기본',
            description: '기본 페이지 입니다.',
            icon: Icon.Docs,
            api() {
              postEditablePageMutate();
            },
          },
          {
            name: '프로젝트',
            description:
              '팀을 위한 프로젝트 관리 템플릿입니다. 프로젝트별로 작업을 정리하고 팀 전반에 걸쳐 진행 상황을 트래킹하세요.',
            icon: Icon.Progress,
            api() {
              createTemplateMutate('progress');
            },
          },
          {
            name: '문서',
            description: '한 곳에서 팀 문서를 정리하고 협업하세요.',
            icon: Icon.List,
            api() {
              createTemplateMutate('normal');
            },
          },
        ]
      : [
          {
            name: 'normal',
            description: '기본 채팅 페이지 입니다.',
            icon: Icon.Chat,
            api() {
              postSocketPageMutate();
            },
          },
        ];

  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm lg:translate-x-0 translate-x-[40%] transform px-4 sm:px-0 lg:max-w-3xl right-1/4 lg:left-1/4">
          {({ close }) => (
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                {templates.map((item) => (
                  <button
                    key={item.name}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => {
                      item?.api();
                      close();
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 bg-[#9bbdba] rounded-lg">
                      <item.icon aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 text-left">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 text-left">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </>
  );
};
