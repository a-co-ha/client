import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import { EditActiveIcon } from '../selector-menu/EditActiveIcon';
import { EditInactiveIcon } from '../selector-menu/EditInactiveIcon';
import type { NameSelectorMenuProps } from '../editable-block/type';
import { useUsersQuery } from '@/hooks/queries/users';

interface User {
  _id: string;
  name: string;
}

export default function NameSelectorMenu({
  position,
  handleNameSelector,
  closeMenu,
}: NameSelectorMenuProps) {
  const { isLoading, error, data } = useUsersQuery();

  useEffect(() => {
    document.getElementById('menu-button')?.click();
  }, [data]);
  if (isLoading) return <>loading...</>;

  const nameChangeHandler = (name: string) => {
    handleNameSelector(name);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      closeMenu();
    }
  };

  return (
    <div
      className="fixed top-16 w-56 text-right"
      css={{
        top: position.y,
        left: position.x,
      }}
      onBlur={closeMenu}
      onKeyUp={handleKeyUp}
    >
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button id="menu-button" />
        <Menu.Items
          className={
            'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ' +
            (position.y > 500 ? ' bottom-full' : '') +
            (position.x > 600 ? 'right-full' : '')
          }
        >
          <div className="px-1  py-1 divide-y divide-dashed border-solid border-2 border-indigo-500/50 ">
            {data.map((user: User) => {
              return (
                <Menu.Item key={user._id}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white ' : 'text-gray-900 '
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => nameChangeHandler(user.name)}
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
                      {user.name}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
