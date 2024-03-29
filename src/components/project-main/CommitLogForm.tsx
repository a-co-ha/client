import { useGithubRepoForm } from '@/hooks/form/useGithubRepoForm';
import { useGetOrgs } from '@/hooks/github/getHubOrgs';
import { useGetRepos } from '@/hooks/github/getHubRepos';
import { useRegisterHub } from '@/hooks/github/registerHub';
import { ConfirmModal } from '@/hooks/useConfirmModal';
import { HelpModal } from '@/hooks/useHelpModal';
import type { CommitLogFormType } from '@/pages/api/github/type';
import {
  commitLogModalFormState,
  commitLogModalOrgsSearchState,
  commitLogModalReposSearchState,
} from '@/recoil/github/atom';
import { confirmModalState } from '@/recoil/project/atom';
import { MODAL_KEY } from '@/utils/const';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import * as styles from './styles';

export const CommitLogForm = ({
  channelId,
}: {
  channelId: string | string[] | undefined;
}) => {
  const getOrgs = useGetOrgs();
  const getRepos = useGetRepos();
  const registerHub = useRegisterHub(channelId);
  const [selected, setSelected] = useState('organization');
  const [isFocus, setIsFocus] = useState(false);
  const [registerHubData, setRegisterHubData] = useState({
    repoName: '',
    repoType: '',
  });
  const [isFocusContent, setIsFocusContent] = useState('');
  const orgsSearchResponse = useRecoilValue(commitLogModalOrgsSearchState);
  const reposSearchResponse = useRecoilValue(commitLogModalReposSearchState);
  const resetOrgResponse = useResetRecoilState(commitLogModalOrgsSearchState);
  const resetRepoResponse = useResetRecoilState(commitLogModalReposSearchState);
  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    confirmModalState(MODAL_KEY.commitLog)
  );
  const methods = useForm<CommitLogFormType>({
    defaultValues: {
      searchOptionsInput: 'organization',
    },
    mode: 'onSubmit',
  });
  const { searchOptionsInput } = useGithubRepoForm({
    control: methods.control,
  });

  const onChangeHandler = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    if (value === undefined) return;
    setSelected(value);
    onChange(value);
  };

  const onSubmit = (searchOptions: CommitLogFormType) => {
    resetOrgResponse();
    resetRepoResponse();
    if (searchOptions.searchOptionsInput === 'organization') {
      searchOptions.searchOptionsInput;
      getOrgs.mutate();
    } else {
      getRepos.mutate();
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    if (button.nextElementSibling && e.key === 'ArrowDown') {
      (button.nextElementSibling as HTMLButtonElement).focus();
      (button.nextElementSibling as HTMLButtonElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (!button.nextElementSibling && e.key === 'ArrowDown') {
      (button.parentElement?.firstElementChild as HTMLButtonElement).focus();
    }
    if (button.previousElementSibling && e.key === 'ArrowUp') {
      (button.previousElementSibling as HTMLButtonElement).focus();
      (button.previousElementSibling as HTMLButtonElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (!button.previousElementSibling && e.key === 'ArrowUp') {
      (button.parentElement?.lastElementChild as HTMLButtonElement).focus();
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsCommitLogFormModal(false);
    resetOrgResponse();
    resetRepoResponse();
    setSelected('organization');
    methods.reset();
  };

  const onConfirmHandler = () => {
    registerHub.mutate(registerHubData);
    setIsCommitLogFormModal(false);
    setIsModalOpen(false);
    resetOrgResponse();
    resetRepoResponse();
    setSelected('organization');
    methods.reset();
  };

  const onCancelHandler = () => {
    setIsFocusContent('');
  };
  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.commitLogModalBackground(isCommitLogFormModal)}
      />
      <ConfirmModal
        modalKey={MODAL_KEY.commitLog}
        title={`다음 저장소로 연결할까요?`}
        content={isFocusContent}
        confirmFunc={onConfirmHandler}
        cancelFunc={onCancelHandler}
      />
      <div css={styles.commitLogModalTransition(isCommitLogFormModal)}>
        <div css={styles.commitLogModalFormBox}>
          <div css={styles.commitLogHelpModalAlign}>
            <HelpModal
              content={`내가 속한 organization 또는\n내가 만든 repository를 검색하고 우리의 프로젝트에 연결해 보세요!\n(단, private 저장소는 검색되지 않습니다)`}
              direction={`left`}
            />
          </div>
          <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div css={styles.commitLogFormBox}>
                <div css={styles.commitLogFormAlign}>
                  <label htmlFor={`organization`}>
                    <input
                      id={`organization`}
                      css={styles.commitLogModalBtn}
                      type="radio"
                      value="organization"
                      name="searchOption"
                      aria-label="organization"
                      checked={selected === 'organization'}
                      onChange={(e) => {
                        onChangeHandler({
                          value: e.target.value,
                          onChange: searchOptionsInput.onChange,
                        });
                      }}
                    />
                    {/* organization */}
                  </label>
                  <label htmlFor={`repo`} css={styles.commitLogRepoLabel}>
                    <input
                      id={`repo`}
                      css={styles.commitLogModalBtn}
                      type={'radio'}
                      value="repo"
                      name="searchOption"
                      aria-label="repo"
                      checked={selected === 'repo'}
                      onChange={(e) => {
                        onChangeHandler({
                          value: e.target.value,
                          onChange: searchOptionsInput.onChange,
                        });
                      }}
                    />
                    {/* repo */}
                  </label>
                  <button
                    disabled={methods.formState.isSubmitting}
                    css={styles.commitLogFormBtn}
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: '#f85d75' }}
                    />
                  </button>
                </div>

                <div>
                  {orgsSearchResponse.length !== 0 ? (
                    <div css={styles.ItemBox} onClick={() => setIsFocus(false)}>
                      <div css={styles.ItemBoxPadding}>
                        {orgsSearchResponse.map((org, i) => {
                          return (
                            <button
                              key={i}
                              css={styles.orgItem}
                              type={'button'}
                              onKeyDown={onKeyDownHandler}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFocus(true);
                                setIsFocusContent(
                                  org.desc
                                    ? `${org.name} : ${org.desc}`
                                    : `${org.name}`
                                );
                                setRegisterHubData({
                                  repoName: org.name,
                                  repoType: 'org',
                                });
                              }}
                            >
                              {org.orgImg !== '' ? (
                                <Image
                                  src={org.orgImg}
                                  width={40}
                                  height={40}
                                  css={{ borderRadius: '0.375rem' }}
                                  alt={`org image`}
                                />
                              ) : null}
                              <span css={styles.orgName}>{org.name}</span>
                              <span css={styles.orgDesc}>{org.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : reposSearchResponse.length !== 0 ? (
                    <div css={styles.ItemBox}>
                      <div css={styles.ItemBoxPadding}>
                        {reposSearchResponse.map((repo, i) => {
                          return (
                            <button
                              key={i}
                              css={styles.orgItem}
                              type={'button'}
                              onKeyDown={onKeyDownHandler}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFocus(true);
                                setIsFocusContent(
                                  repo.desc
                                    ? `${repo.name} : ${repo.desc}`
                                    : `${repo.name}`
                                );
                                setRegisterHubData({
                                  repoName: repo.name,
                                  repoType: 'repo',
                                });
                              }}
                            >
                              <span css={styles.orgName}>{repo.name}</span>
                              <span css={styles.orgDesc}>{repo.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : getOrgs.isLoading || getRepos.isLoading ? (
                    <div css={styles.errorMessage}>검색중...</div>
                  ) : (
                    <div css={styles.errorMessage}>
                      검색된 repository가 없어요
                    </div>
                  )}
                </div>
              </div>
              <button
                css={styles.commitLogSubmitBtn(isFocus)}
                onClick={() => {
                  setIsModalOpen(true);
                  setIsFocus(false);
                }}
                disabled={
                  methods.formState.isSubmitting || isModalOpen || !isFocus
                }
              >
                <span>Connect</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
