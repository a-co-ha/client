import { TAG_MENU_ITEM } from '@/utils/const';
import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import type { TagSelectorMenuProps } from '../editable-block/type';

export default function TagSelectorMenu({
  position,
  handleTagSelection,
  closeMenu,
}: TagSelectorMenuProps) {
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
          <div className="px-1  py-1">
            {TAG_MENU_ITEM.map((item) => {
              return (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-indigo-300 text-white ' : 'text-gray-900 '
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleTagSelection(item.tag)}
                    >
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
