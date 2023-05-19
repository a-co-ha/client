import { useEffect, useLayoutEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import * as styles from './styles';
import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import { useGetOrgCommit } from '@/hooks/github/getOrgCommit';
import { useGetRepoCommit } from '@/hooks/github/getRepoCommit';
import { useGetOrgIssue } from '@/hooks/github/getOrgIssue';
import { useGetRepoIssue } from '@/hooks/github/getRepoIssue';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { CommitLogForm } from './CommitLogForm';
import {
  commitLogModalFormState,
  commitLogModalOrgSearchState,
  commitLogModalRepoSearchState,
  githubConnectState,
  githubOrgCommitState,
  githubRepoCommitState,
  githubCommitErrorState,
  githubOrgIssueState,
  githubRepoIssueState,
} from '@/recoil/github/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import {
  faScrewdriverWrench,
  faTentArrowLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import { HelpModal } from '@/hooks/useHelpModal';
import { Loading } from '../loading/Loading';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const CommitLog = () => {
  const { channelId } = useGetUrlInfo();
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
      if (githubConnectData.repoName !== '' && githubConnectData.owner !== '') {
        getRepoCommitList.mutate({
          owner: githubConnectData.owner,
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
        org: githubConnectData.owner,
        repo: githubConnectData.repoName,
      });
    }
  };
  console.log(`issue`, githubOrgIssueData);
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
              {githubOrgData !== null && githubOrgData.img && (
                <Image
                  src={githubOrgData.img}
                  width={20}
                  height={20}
                  alt={`github repo Image`}
                  css={{ borderRadius: `50%` }}
                />
              )}
              <div
                css={styles.commitLogConnectChangeBox}
                onClick={() => setIsCommitLogFormModal(true)}
              >
                <p css={styles.commitLogTitle}>
                  {githubConnectData.repoType === 'org'
                    ? githubOrgData.name
                    : githubRepoData.name}
                </p>
                <FontAwesomeIcon icon={faTentArrowLeftRight} color={`white`} />
              </div>
              <HelpModal
                content={`프로젝트와 연결된 저장소의\n커밋기록과 이슈를 볼 수 있어요`}
                direction={`left`}
              />
            </div>
            <Tab.List className="flex space-x-1 rounded-b-md  p-1">
              {githubConnectData.repoType === 'org' &&
                githubOrgData &&
                githubOrgData['repos'].map((category) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-bold leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
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
                      owner: githubConnectData.owner,
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
            {/* <CommitLogNavbar /> */}
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
                    {getOrgCommitList.isLoading || getOrgIssueList.isLoading ? (
                      <Loading position={`absolute`} />
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
                                    <span css={styles.commitLogAuthor}>
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
                                    <span css={styles.commitLogAuthor}>
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
