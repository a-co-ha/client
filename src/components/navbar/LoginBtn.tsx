import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  userDataState,
  initialUserState,
  loginState,
} from '@/recoil/user/atom';
import { useSetRecoilState } from 'recoil';
import { getUser } from '@/pages/api/user/getUser';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as styles from './styles';
import githubLogo from '@/images/githubLogo.png';

export const LoginBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const setUserData = useSetRecoilState(userDataState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setInitialUser = useSetRecoilState(initialUserState);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const githubLoginHandler = async () => {
    try {
      const userData = await getUser();
      const initialUser = !userData[0].channel_id;
      setUserData(userData);
      setInitialUser(initialUser);
      setIsLoggedIn(true);
      closeModal();
      initialUser
        ? router.push(`/main`)
        : router.push(`/project/${userData[0].channel_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div css={styles.loginBox}>
        <div css={styles.loginBox}>
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            로그인 버튼
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    A ~ Co Ha!
                    <br />
                    아코하
                  </Dialog.Title>
                  <Image
                    src={githubLogo}
                    css={styles.loginLogo}
                    alt="loginLogo"
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={githubLoginHandler}
                    >
                      Github 로그인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
