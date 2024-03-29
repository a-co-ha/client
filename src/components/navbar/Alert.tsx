import { Fragment } from 'react';
import * as styles from './styles';
import { AlertValue } from '../chat-page/SocketContextProvider';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

interface AlertProps {
  alertList: AlertValue[];
}

export const Alert = ({ alertList = [] }: AlertProps) => {
  return (
    <div css={styles.alertBox}>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-hidden overflow-y-scroll">
          <div className="px-1 py-1 ">
            {alertList.map((alert, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-indigo-100' : 'text-gray-900 '
                      } group flex w-full items-center px-2 py-2 text-sm `}
                      css={styles.alertMenuItem}
                    >
                      <Link
                        href={`/project/${alert.channelId}/${alert.pageId}?name=${alert.pageName}&type=${alert.type}`}
                      >
                        {` ${alert.channelName}프로젝트의 ${
                          alert.subPageName
                            ? `${alert.subPageName} 페이지의`
                            : ''
                        }
  ${alert.pageName} 페이지`}
                      </Link>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </div>
  );
};
