import { Fragment, useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles';
import { AlertValue, SocketContext } from '../chat-page/SocketContextProvider';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

/**
 * 알림은 toast를 통해 화면에 띄워진다
 * 1. 알림을 클릭 했을 때  (READ_ALERT 발생)
 *  - 클릭시 해당 알림을 발생시킨 지점으로 이동 할 수 있어야한다.
 *  - 클릭으로 확인한 알림은 알림 메뉴에 들어가지 않는다.  (알림 확인 여부가 true로 설정됨)
 * 2. 알림을 클릭하지 않았을 때
 *  - 해당 알림은 알림메뉴에 쌓인다  (각 알림 확인 여부가 false 이면 메뉴에 쌓인다 => 서버에서 확인 여부 체크하여 false인 알람배열만 보내준다.(프론트에서는 불가능))
 *  - 확인하지 않은 알림있다는 표시한다. (알림창 확인하지 않은 알람이 하나라도 있을 시)
 *
 * ====> 알림 종모양 클릭시 모든 알림 읽어지는것으로 변경
 *
 * 알림 메뉴
 * - 클릭시 해당 알림을 발생시킨 지점으로 이동 할 수 있어야한다.
 * - 클릭으로 확인한 알림은 알림 메뉴에서 사라진다.
 * 
 *  
 *  알림 메뉴 생성위한 알림 목록 api 
 *  *  key : 태그한 페이지의 channelId, pageId, pageName, type, subPageName
 * 
 * 메뉴에 넣을 dom
 *  <>
          <Link
            href={`/project/${data.channelId}/${data.pageId}?name=${data.pageName}&type=${data.type}`}
          >
            <div>
              {`${data.channelName}프로젝트의 ${
                data.subPageName ? `${data.subPageName} 페이지의` : ''
              }
          ${data.pageName} 페이지에서 나(${data.targetUserName})를
          태그하였습니다.`}
            </div>
          </Link>
        </>,
 *
 */

export const Alert = () => {
  const { socket, getAlert, alertSocket } = useContext(SocketContext);
  const [isAlert, setIsAlert] = useState<boolean | null>(null);
  const [alertList, setAlertList] = useState<AlertValue[] | null>(null);
  console.log('🚀 ~ file: Alert.tsx:48 ~ Alert ~ alertList:', alertList);

  useEffect(() => {
    alertSocket(setIsAlert, setAlertList);
    getAlert(setIsAlert);
  }, [socket]);

  const handleClick = () => {
    socket.emit('READ_ALERT');
  };

  return (
    <>
      {isAlert !== null && (
        <div css={styles.alertBox}>
          <Menu as="div" className="relative inline-block text-left">
            <div onClick={handleClick}>
              <Menu.Button>
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: isAlert ? '#ffee38' : 'grey' }}
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
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
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
};
