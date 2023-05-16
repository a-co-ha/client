import { useEffect, useLayoutEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import * as styles from './styles';
import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import { useGetOrgCommit } from '@/hooks/github/getOrgCommit';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { CommitLogForm } from './CommitLogForm';
import {
  commitLogModalFormState,
  commitLogModalOrgSearchState,
  githubConnectState,
  githubOrgCommitState,
} from '@/recoil/github/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const CommitLog = () => {
  const { channelId } = useGetUrlInfo();
  const githubConnectData = useRecoilValue(githubConnectState(channelId));
  const getOrg = useGetOrg(channelId);
  const getRepo = useGetRepo(channelId);
  const getOrgCommitList = useGetOrgCommit(channelId);
  const githubOrgData = useRecoilValue(commitLogModalOrgSearchState);
  const githubOrgCommitData = useRecoilValue(githubOrgCommitState);
  useLayoutEffect(() => {
    console.log(`connectdata`, githubConnectData);
    if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'org'
    ) {
      getOrg.mutate(githubConnectData.repoName);
      // getOrgCommitList.mutate({
      //   org: githubConnectData.repoName,
      //   repo: githubOrgData.repos[0].name,
      // });
    } else if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'repo'
    ) {
      return getRepo.mutate(githubConnectData.repoName);
    }
  }, [githubConnectData]);

  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );
  const [githubConnect, setGithubConnect] = useRecoilState(
    githubConnectState(channelId)
  );
  return (
    <div css={styles.commitLogBox} className="w-full max-w-md px-2 sm:px-0">
      <CommitLogForm channelId={channelId} />
      {githubConnectData.repoName !== '' ? (
        <div
          css={styles.commitLogInnerBox(
            githubConnectData.repoName === '' ? false : true
          )}
        >
          <Tab.Group>
            <div css={styles.commitLogTitleBox}>
              {githubOrgData.orgImg && (
                <Image
                  src={githubOrgData.orgImg}
                  width={20}
                  height={20}
                  alt={`github repo Image`}
                  css={{ borderRadius: `50%` }}
                />
              )}

              <p css={styles.commitLogTitle}>A - COHA</p>
            </div>
            <Tab.List className="flex space-x-1 rounded-b-md  p-1">
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
                    onClick={() =>
                      getOrgCommitList.mutate({
                        org: githubOrgData.orgName,
                        repo: category.name,
                      })
                    }
                  >
                    {category.name}
                  </Tab>
                ))}
              {/* <button onClick={() => getRepository.mutate()}>getRepository</button> */}
            </Tab.List>
            <Tab.Panels className="mt-2 h-2/3">
              {githubOrgCommitData &&
                githubOrgCommitData.map((commit, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3 h-full',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    <div css={styles.commitLogItemAlign}>
                      <ul css={styles.commitLogItemBox}>
                        <div css={styles.commitLogLine}></div>
                        <li
                          css={styles.commitLogItem}
                          onClick={() => console.log(`commit url이동`)}
                        >
                          <span css={styles.commitLogSphere}></span>
                          <div>
                            {/* data 재 가공 유틸 필요 */}
                            <span>{commit.payload.ref}</span>
                            <span>{commit.created_at}</span>
                            <span>{commit.payload.commits[0].author.name}</span>
                          </div>
                        </li>
                      </ul>
                      {/* {posts.map((post) => (
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
                    ))} */}
                    </div>
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
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
