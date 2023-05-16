import { useEffect, useLayoutEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import * as styles from './styles';
import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { CommitLogForm } from './CommitLogForm';
import {
  commitLogModalFormState,
  commitLogModalOrgSearchState,
  githubConnectState,
} from '@/recoil/github/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const CommitLog = () => {
  const { channelId } = useGetUrlInfo();
  const githubConnectData = useRecoilValue(githubConnectState(channelId));
  const githubOrgData = useRecoilValue(commitLogModalOrgSearchState);
  const getOrg = useGetOrg(channelId);
  const getRepo = useGetRepo(channelId);
  useLayoutEffect(() => {
    console.log(`connectdata`, githubConnectData);
    if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'org'
    ) {
      return getOrg.mutate(githubConnectData.repoName);
    } else if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'repo'
    ) {
      return getRepo.mutate(githubConnectData.repoName);
    }
  }, [githubConnectData]);
  useEffect(() => {}, [githubOrgData]);

  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );
  const [githubConnect, setGithubConnect] = useRecoilState(
    githubConnectState(channelId)
  );
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  return (
    <div css={styles.commitLogBox} className="w-full max-w-md px-2 sm:px-0">
      <CommitLogForm channelId={channelId} />
      {githubConnectData.repoName !== '' ? (
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {githubOrgData &&
              githubOrgData['repos'].map((category) => (
                // {Object.keys(categories).map((category) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {category.name}
                </Tab>
              ))}
            {/* <button onClick={() => getRepository.mutate()}>getRepository</button> */}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="relative rounded-md p-3 hover:bg-gray-100"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>

                      <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{post.date}</li>
                        <li>&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li>&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>

                      <a
                        onClick={() => setIsCommitLogFormModal(true)}
                        href="#"
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div
          css={styles.commitLogInnerBox(
            githubConnectData.repoName === '' ? false : true
          )}
          onClick={() => setIsCommitLogFormModal(true)}
        >
          <Tab.Group>
            <div css={styles.commitLogTitleBox}>
              <FontAwesomeIcon icon={faGithub} color={`#000000`} />
              <p css={styles.commitLogTitle}>A - COHA</p>
            </div>

            <Tab.List className="flex space-x-1 rounded-b-md  p-1">
              {[`Client`, `Server`].map((category) => (
                // {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
              {/* <button onClick={() => getRepository.mutate()}>getRepository</button> */}
            </Tab.List>
            <div css={styles.commitLogPlusBtnBox}>
              <FontAwesomeIcon
                icon={faSquarePlus}
                color={`#000000`}
                size={`2xl`}
              />
              <p>깃허브 연결하기</p>
            </div>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};
