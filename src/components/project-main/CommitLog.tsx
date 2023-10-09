import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import { useGetOrgCommit } from '@/hooks/github/getOrgCommit';
import { useGetOrgIssue } from '@/hooks/github/getOrgIssue';
import { useGetRepoCommit } from '@/hooks/github/getRepoCommit';
import { useGetRepoIssue } from '@/hooks/github/getRepoIssue';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { HelpModal } from '@/hooks/useHelpModal';
import {
  commitLogModalFormState,
  commitLogModalOrgSearchState,
  commitLogModalRepoSearchState,
  githubCommitErrorState,
  githubConnectState,
  githubOrgCommitState,
  githubOrgIssueState,
  githubRepoCommitState,
  githubRepoIssueState,
} from '@/recoil/github/atom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import {
  faScrewdriverWrench,
  faTentArrowLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab } from '@headlessui/react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Loading } from '../loading/Loading';
import { CommitLogForm } from './CommitLogForm';
import * as styles from './styles';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const CommitLog = () => {
  const { channelId } = useGetUrlInfo();
  const myUserName = getCookie(`myUserName`);
  const githubConnectData = useRecoilValue(githubConnectState(channelId));
  const getOrg = useGetOrg(channelId);
  const getRepo = useGetRepo(channelId);
  const getOrgCommitList = useGetOrgCommit(channelId);
  const getRepoCommitList = useGetRepoCommit(channelId);
  const getOrgIssueList = useGetOrgIssue(channelId);
  const getRepoIssueList = useGetRepoIssue(channelId);
  const githubOrgData = useRecoilValue(commitLogModalOrgSearchState);
  const githubRepoData = useRecoilValue(commitLogModalRepoSearchState);
  const githubOrgCommitData = useRecoilValue(githubOrgCommitState);
  const githubRepoCommitData = useRecoilValue(githubRepoCommitState);
  const githubOrgIssueData = useRecoilValue(githubOrgIssueState);
  const githubRepoIssueData = useRecoilValue(githubRepoIssueState);
  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );
  const [clickRepoName, setClickRepoName] = useState('');
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [githubError, setGithubError] = useRecoilState(githubCommitErrorState);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    if (githubOrgData == null) {
      return setGithubError(true);
    }
    if (githubConnectData.repoType === 'org') {
      if (
        githubConnectData.repoName !== '' &&
        githubOrgData.repos[0].name !== ''
      ) {
        getOrgCommitList.mutate({
          org: githubConnectData.repoName,
          repo: githubOrgData.repos[0].name,
        });
        setIsIssueOpen(false);
        setClickRepoName(githubOrgData.repos[0].name);
      }
    } else if (githubConnectData.repoType === 'repo') {
      if (githubConnectData.repoName !== '') {
        getRepoCommitList.mutate({
          repo: githubConnectData.repoName,
        });
        setIsIssueOpen(false);
      }
    }
  }, [githubOrgData, githubRepoData]);

  const onClickHandler = () => {
    setIsIssueOpen(true);
    if (githubConnectData.repoType === 'org') {
      getOrgIssueList.mutate({
        org: githubConnectData.repoName,
        repo: clickRepoName,
      });
    } else if (githubConnectData.repoType === 'repo') {
      getRepoIssueList.mutate({
        repo: githubConnectData.repoName,
      });
    }
  };

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
              {githubConnectData.repoType === 'org' &&
                githubOrgData !== null &&
                githubOrgData.img && (
                  <Image
                    css={{ borderRadius: `50%` }}
                    src={githubOrgData.img}
                    width={20}
                    height={20}
                    alt={`github repo Image`}
                    loading={`lazy`}
                  />
                )}
              <div
                css={styles.commitLogConnectChangeBox(
                  window && window.innerWidth <= 450
                )}
                onClick={() => setIsCommitLogFormModal(true)}
              >
                <p css={styles.commitLogTitle}>
                  {githubConnectData.repoType === 'org'
                    ? githubOrgData.name
                    : githubRepoData.name}
                </p>
                <FontAwesomeIcon icon={faTentArrowLeftRight} color={`black`} />
              </div>
              <HelpModal
                content={`프로젝트와 연결된 저장소의\n커밋기록과 이슈를 볼 수 있어요`}
                direction={`left`}
              />
            </div>
            <Tab.List className="flex space-x-2 rounded-b-md  p-1 overflow-scroll scrollbar-hide">
              {githubConnectData.repoType === 'org' &&
                githubOrgData &&
                githubOrgData['repos'].map((category) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      classNames(
                        'w-full max-w-[110px] rounded-lg py-2.5 px-1 text-sm font-bold leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-blue-700'
                      )
                    }
                    onClick={() => {
                      setIsIssueOpen(false);
                      setClickRepoName(category.name);
                      getOrgCommitList.mutate({
                        org: githubOrgData.name,
                        repo: category.name,
                      });
                    }}
                  >
                    {category.name}
                  </Tab>
                ))}
              {githubConnectData.repoType === 'repo' && githubRepoData ? (
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-bold leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none hover:bg-sky-500/5',
                      selected && !isIssueOpen
                        ? 'bg-white shadow bg-sky-500/5'
                        : 'bg-white shadow text-blue-100 hover:text-blue-700'
                    )
                  }
                  onClick={() => {
                    setIsIssueOpen(false);
                    getRepoCommitList.mutate({
                      repo: githubConnectData.repoName,
                    });
                  }}
                >
                  {`commit`}
                </Tab>
              ) : null}
            </Tab.List>
            <div>
              <div className="p-1">
                <button
                  css={styles.commitLogIssueBtn(isIssueOpen)}
                  onClick={onClickHandler}
                >
                  issues
                </button>
              </div>
            </div>
            <Tab.Panels className="mt-2 h-[307px]">
              {(githubConnectData.repoType === 'org'
                ? githubOrgData['repos']
                : [`githubRepoData`]
              ).map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3 h-full',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
                  )}
                >
                  <div css={styles.commitLogItemAlign}>
                    {getOrgCommitList.isLoading ||
                    getOrgIssueList.isLoading ||
                    getRepoCommitList.isLoading ||
                    getRepoIssueList.isLoading ? (
                      <Loading position={`absolute`} />
                    ) : (!isIssueOpen &&
                        githubConnectData.repoType === 'org' &&
                        githubOrgCommitData.length === 0) ||
                      (!isIssueOpen &&
                        githubConnectData.repoType === 'repo' &&
                        githubRepoCommitData.length === 0) ||
                      (isIssueOpen &&
                        githubConnectData.repoType === 'org' &&
                        githubOrgIssueData.length === 0) ||
                      (isIssueOpen &&
                        githubConnectData.repoType === 'repo' &&
                        githubRepoIssueData.length === 0) ? (
                      <div css={styles.commitLogEmptyResult}>
                        검색된 결과가 없어요
                      </div>
                    ) : (
                      <div>
                        {(githubConnectData.repoType === 'org' &&
                        githubOrgCommitData &&
                        !isIssueOpen
                          ? githubOrgCommitData
                          : githubRepoCommitData
                        ).map((commit, idx) => (
                          <div key={idx} css={styles.commitLogItemBox}>
                            <div css={styles.commitLogLine}></div>
                            <div css={styles.commitLogItem}>
                              <span
                                css={styles.commitLogSphere(`commit`)}
                              ></span>
                              <div css={styles.commitLogMessageBox}>
                                <Link
                                  css={styles.commitLogLink}
                                  href={commit.url}
                                  target={'_blank'}
                                >
                                  <span css={styles.commitLogMessage}>
                                    {commit.message}
                                  </span>
                                  <div css={styles.commitLogMessageDetailBox}>
                                    <span css={styles.commitLogBranch}>
                                      {` - ${commit.branch}`}
                                    </span>
                                    <span
                                      css={styles.commitLogAuthor(
                                        commit.author === myUserName
                                      )}
                                    >
                                      {commit.author}
                                    </span>
                                    <span css={styles.commitLogTime}>
                                      {commit.time}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                        {(githubConnectData.repoType === 'org' &&
                        githubOrgIssueData &&
                        isIssueOpen
                          ? githubOrgIssueData
                          : githubRepoIssueData
                        ).map((issue, idx) => (
                          <div key={idx} css={styles.commitLogItemBox}>
                            <div css={styles.commitLogItem}>
                              <span
                                css={styles.commitLogSphere(`issue`)}
                              ></span>
                              <div css={styles.commitLogMessageBox}>
                                <Link
                                  css={styles.commitLogLink}
                                  href={issue.url}
                                  target={'_blank'}
                                >
                                  <span css={styles.commitLogMessage}>
                                    {issue.title}
                                  </span>
                                  <div css={styles.commitLogMessageDetailBox}>
                                    <span
                                      css={styles.commitLogLabel(
                                        issue.labels[0]?.name
                                      )}
                                    >
                                      {issue.labels[0]?.name}
                                    </span>
                                    <span
                                      css={styles.commitLogAuthor(
                                        issue.author === myUserName
                                      )}
                                    >
                                      {issue.author}
                                    </span>
                                    <span css={styles.commitLogTime}>
                                      {issue.time}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
            </Tab.List>
            <div css={styles.commitLogPlusBtnBox}>
              {githubConnectData.repoName === '' ? (
                <FontAwesomeIcon
                  size={`2xl`}
                  icon={faSquarePlus}
                  color={`#000000`}
                />
              ) : githubError ? (
                <FontAwesomeIcon
                  size={`2xl`}
                  icon={faScrewdriverWrench}
                  color={`#000000`}
                />
              ) : null}
              <p css={styles.commitLogPlusAndErrorMessage}>
                {githubConnectData.repoName === ''
                  ? `깃허브 연결하기`
                  : githubError
                  ? `일시적인 오류가 발생했어요\n 잠시 후에 다시 시도해주세요`
                  : null}
              </p>
              {githubError ? (
                <span
                  css={styles.commitLogErrorBtn}
                  onClick={() => {
                    githubError ? setGithubError(false) : null;
                    githubConnectData.repoType === 'org'
                      ? getOrg.reset()
                      : getRepo.reset();
                  }}
                >
                  새로고침
                </span>
              ) : null}
            </div>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};
