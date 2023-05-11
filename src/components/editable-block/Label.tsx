import { Fragment, useEffect, useMemo, useState, useContext } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useGetUsers } from '@/hooks/queries/user/getUsers';
import { ChannelUser } from '@/pages/api/user/type';
import { useGetLabels } from '@/hooks/queries/editable/getLabels';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { updateLabel } from '@/pages/api/editable/updateLabel';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { toast } from 'react-toastify';
import { usePreviousState } from '@/hooks/usePrevious';

export default function Label() {
  const { channelId, pageId } = useGetUrlInfo();
  const { socket } = useContext(SocketContext);
  const [query, setQuery] = useState('');

  const { data } = useGetLabels(pageId);
  console.log('🚀 ~ file: Label.tsx:19 ~ gdgd   Label ~ data:', data);
  const selectedUsers = data?.map((item) => item.content);
  console.log(
    '🚀 ~ file: Label.tsx:20 ~ Label ~ gdgd selectedUsers:',
    selectedUsers
  );
  const { data: usersInChannel } = useGetUsers();
  const users = usersInChannel?.map((x: ChannelUser) => x.name);

  // data 가 있을 떄 selected의 초기값으로 selectedUsers가 들어가야함
  const [selected, setSelected] = useState<string[]>([]);
  console.log('🚀 ~ file: Label.tsx:20 ~ ss Label ~ selected:', selected);
  const prevSelected: string[] = usePreviousState(selected) ?? [];
  console.log(
    '🚀 ~ file: Label.tsx:22 ~ Label ~ ss prevSelected:',
    prevSelected
  );

  // const [alertData, setAlertData] = useState(null);
  // console.log('🚀 ~ file: Label.tsx:24 ~ Label ~ alertData:', alertData);

  useEffect(() => {
    console.log('useffect data ss gdgd 변경');
    setSelected(selectedUsers ?? []);
  }, [data]);

  useEffect(() => {
    socket.on('ALERT', (data) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data:', data);
    });
    socket.on('GET_ALERT', (data) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data:', data);
      // setAlertData(data);
      toast(
        `🦄 ${data.channelName}프로젝트의 ${data.subPageName}${data.pageName}페이지에서 나(${data.targetUserName})를 태그하였습니다.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        }
      );
    });
  }, [socket]);

  const filteredPeople =
    query === ''
      ? users
      : users.filter((user: string) =>
          user
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const afterLeaveHandler = () => {
    updateLabel(channelId, pageId, selected);

    const newSelected = selected.filter(
      (user) => prevSelected && !prevSelected.includes(user)
    );

    console.log(
      '🚀 ~ file: Label.tsx:69 ~ afterLeaveHandler ~ newSelected:',
      newSelected
    );

    newSelected.forEach((name) => {
      const userId = usersInChannel.filter((user: any) => user.name === name)[0]
        .userId;

      socket.emit('SET_ALERT', {
        channelId,
        pageId,
        targetUserId: userId.toString(),
        targetUserName: name,
      });
    });
    setQuery('');
  };

  return (
    <div className="w-1/3">
      <Combobox
        value={selected}
        onChange={(name) => setSelected(name)}
        multiple
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(users: string[]) =>
                users?.map((user) => '@' + user).join(' ')
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={afterLeaveHandler}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((user: string[], index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {user}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
