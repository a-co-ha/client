import { Fragment, useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles';
import { toast } from 'react-toastify';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { EditActiveIcon } from '../selector-menu/EditActiveIcon';
import { EditInactiveIcon } from '../selector-menu/EditInactiveIcon';

export const Alert = () => {
  const { socket } = useContext(SocketContext);
  const [isAlert, setIsAlert] = useState<boolean | null>(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  console.log('🚀 ~ file: Alert.tsx:15 ~ Alert ~ isOpenAlert:', isOpenAlert);
  console.log('🚀 ~ file: Alert.tsx:11 ~ Alert ~ isAlert:', isAlert);

  useEffect(() => {
    socket.on('ALERT', (data: string) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data status:', data);
      if (data === 'true') setIsAlert(true);
    });
    socket.on('GET_ALERT', (data) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data:', data);
      toast.info(
        <>
          <div>
            {`${data.channelName}프로젝트의 ${
              data.subPageName ? `${data.subPageName} 페이지의` : ''
            }
            ${data.pageName} 페이지에서 나(${data.targetUserName})를
            태그하였습니다.`}
          </div>
          {/* <PageNameLink
            channelId={channelId}
            pageId={page._id}
            pageName={data.pageName}
            type={'template-progress'}
          /> */}
        </>,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    });
  }, [socket]);

  const handleClick = () => {
    console.log('cccc ALERT', 'status');
    socket.emit('READ_ALRET');
  };

  return (
    <>
      {isAlert !== null && (
        <div css={styles.alertBox}>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: isAlert ? '#ffee38' : 'grey' }}
                  aria-hidden="true"
                />
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <EditActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
};
