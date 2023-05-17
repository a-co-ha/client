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
  githubCommitErrorState,
} from '@/recoil/github/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';

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
  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );
  const githubError = useRecoilValue(githubCommitErrorState);

  useLayoutEffect(() => {
    console.log(`connectdata`, githubConnectData);
    if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'org'
    ) {
      getOrg.mutate(githubConnectData.repoName);
    } else if (
      githubConnectData.repoName !== '' &&
      githubConnectData.repoType === 'repo'
    ) {
      return getRepo.mutate(githubConnectData.repoName);
    }
  }, [githubConnectData]);

  useEffect(() => {
    if (
      githubConnectData.repoName !== '' &&
      githubOrgData.repos[0].name !== ''
    ) {
      getOrgCommitList.mutate({
        org: githubConnectData.repoName,
        repo: githubOrgData.repos[0].name,
      });
    }
  }, [githubOrgData]);

  return (
    <div css={styles.commitLogBox} className="w-full max-w-md px-2 sm:px-0">
      <CommitLogForm channelId={channelId} />
      {githubConnectData.repoName !== '' && !githubError ? (
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
                          <Link
                            css={styles.commitLogLink}
                            href={commit.url}
                            target={'_blank'}
                          >
                            <span css={styles.commitLogMessage}>
                              {commit.message}
                            </span>
                            <span css={styles.commitLogBranch}>
                              {commit.branch}
                            </span>
                            <span css={styles.commitLogTime}>
                              {commit.time}
                            </span>
                            <span css={styles.commitLogAuthor}>
                              {commit.author}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      ) : (
        <div
          css={styles.commitLogInnerBox(
            githubConnectData.repoName === '' ? false : true,
            githubError
          )}
          onClick={() => {
            githubError ? null : setIsCommitLogFormModal(true);
          }}
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
              {githubConnectData.repoName === '' ? (
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  color={`#000000`}
                  size={`2xl`}
                />
              ) : githubError ? (
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  color={`#000000`}
                  size={`2xl`}
                />
              ) : null}
              <p css={styles.commitLogPlusAndErrorMessage}>
                {githubConnectData.repoName === ''
                  ? `깃허브 연결하기`
                  : githubError
                  ? `일시적인 오류가 발생했어요\n 잠시 후에 다시 시도해주세요`
                  : null}
              </p>
            </div>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};
