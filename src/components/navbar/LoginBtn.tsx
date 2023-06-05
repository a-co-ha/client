import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { loginState, loginModalState } from '@/recoil/user/atom';
import { Profile } from './Profile';
import { getCookie } from 'cookies-next';
import * as styles from './styles';
import githubLogo from '@/images/githubLogo.png';
import acohaGreen from '@/images/channelImg/6.png';

export const LoginBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalState);
  console.log(`이즈로그드이이인`, isLoggedIn);
  useEffect(() => {
    const token = getCookie(`accessToken`);
    console.log(`로그인 버튼 토큰!@`, token);
    // token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };
  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <div>
          <div>
            <div css={styles.loginBox}>
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                로그인
              </button>
            </div>
          </div>

          <Transition appear show={isLoginModalOpen} as={Fragment}>
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
                        src={acohaGreen}
                        css={styles.loginLogo}
                        alt="loginLogo"
                      />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          아코하는 깃허브 계정으로 간편 로그인을 지원해요
                          <br></br> 바로 시작해 볼까요?
                        </p>
                      </div>

                      <div className="mt-2">
                        <Link
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 no-underline text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          href={`${
                            process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
                              ? process.env.NEXT_PUBLIC_DEV_OAUTH_URL
                              : process.env.NEXT_PUBLIC_OAUTH_URL
                          }`}
                          onClick={() => closeModal()}
                        >
                          Github 로그인
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
};
