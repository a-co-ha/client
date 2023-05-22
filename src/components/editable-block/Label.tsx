import { Fragment, useEffect, useState, useContext, useMemo } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useGetUsers } from '@/hooks/queries/user/getUsers';
import { useGetLabels } from '@/hooks/queries/editable/getLabels';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { usePreviousState } from '@/hooks/usePrevious';
import { UserInChannel } from './type';
import { usePutLabels } from '@/hooks/queries/editable/putLabels';
import _ from 'lodash';

export default function Label() {
  const { channelId, pageId } = useGetUrlInfo();
  const { socket } = useContext(SocketContext);
  const [query, setQuery] = useState('');
  const { data } = useGetLabels(pageId);
  const selectedUsers = useMemo(
    () => data?.map((item) => item.content) ?? [],
    [data]
  );

  const { data: usersInChannel } = useGetUsers();
  const users = usersInChannel?.map((x: UserInChannel) => x.name);
  const { mutate: updateLabel } = usePutLabels(channelId, pageId);
  const [selected, setSelected] = useState<string[]>(selectedUsers);

  const prevSelected: string[] = usePreviousState(selected) ?? [];

  useEffect(() => {
    setSelected(selectedUsers ?? []);
  }, [data]);

  const filteredPeople =
    query === ''
      ? users
      : users?.filter((user: string) =>
          user
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const afterLeaveHandler = () => {
    if (_.isEqual(selected, selectedUsers)) {
      return;
    }
    updateLabel(selected);

    const newSelected = selected.filter(
      (user) => prevSelected && !prevSelected.includes(user)
    );

    newSelected.forEach((name) => {
      const user = usersInChannel?.find(
        (user: UserInChannel) => user.name === name
      );
      if (user) {
        const { userId } = user;
        socket.emit('SET_ALERT', {
          channelId,
          pageId,
          targetUserId: userId?.toString(),
          targetUserName: name,
        });
      }
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredPeople?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((user: string, index: number) => (
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
