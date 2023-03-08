import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import type { TagSelectorMenuProps } from '../editable-block/type';
import { EditActiveIcon } from './EditActiveIcon';
import { EditInactiveIcon } from './EditInactiveIcon';

const menuItemTag = [
  { tag: 'h1', label: 'h1' },
  { tag: 'h2', label: 'h2' },
  { tag: 'h3', label: 'h3' },
  { tag: 'b', label: 'bold' },
  { tag: 'i', label: 'i' },
  { tag: 'code', label: 'code' },
  { tag: 'img', label: 'image' },
];

export default function TagSelectorMenu({
  position,
  handleTagSelection,
  closeMenu,
}: TagSelectorMenuProps) {
  const tagChangeHandler = (tag: string) => {
    handleTagSelection(tag);
  };

  useEffect(() => {
    document.getElementById('menu-button')?.click();
  }, []);

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
      // onBlur={closeMenu}
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
            {menuItemTag.map((item) => {
              return (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white ' : 'text-gray-900 '
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => tagChangeHandler(item.tag)}
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
                      {item.label}
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
