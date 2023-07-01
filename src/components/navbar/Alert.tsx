import { Fragment, useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles';
import { AlertValue, SocketContext } from '../chat-page/SocketContextProvider';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

export const Alert = () => {
  const { socket, getAlert, alertSocket } = useContext(SocketContext);
  const [isAlert, setIsAlert] = useState<boolean | null>(null);
  const [alertList, setAlertList] = useState<AlertValue[] | null>(null);

  useEffect(() => {
    document.getElementById('alert-button')?.click();
    alertSocket(setIsAlert, setAlertList);
    getAlert(setIsAlert);
    socket.emit('READ_ALERT');
  }, [socket]);

  return (
    <>
      {
        <div css={styles.alertBox}>
          <Menu as="div" className="inline-block text-left mt-5">
            <Menu.Button id="alert-button" />
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-30 overflow-hidden overflow-y-scroll">
              <div className="px-1 py-1 ">
                {alertList &&
                  alertList.map((alert, index) => {
                    return (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-[#e8e8e8]' : 'text-gray-900 '
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <Link
                              href={`/project/${alert.channelId}/${alert.pageId}?name=${alert.pageName}&type=${alert.type}`}
                              css={styles.alertMenuItem}
                            >
                              <span
                                style={{
                                  backgroundColor: '#b3ccf5',
                                  borderRadius: '0.3rem',
                                  padding: '0.2rem',
                                }}
                              >
                                @태그
                              </span>
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
          </Menu>
        </div>
      }
    </>
  );
};
