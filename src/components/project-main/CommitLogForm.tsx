import { useForm } from 'react-hook-form';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { commitLogModalFormState } from '@/recoil/github/atom';
import {
  commitLogModalOrgSearchState,
  commitLogModalRepoSearchState,
} from '@/recoil/github/atom';
import { useGithubRepoForm } from '@/hooks/form/useGithubRepoForm';
import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import { HelpModal } from '@/hooks/useHelpModal';
import Image from 'next/image';
import * as styles from './styles';
import type { commitLogFormType } from './type';
import { divide } from 'lodash';

export const CommitLogForm = ({
  channelId,
}: {
  channelId: string | string[] | undefined;
}) => {
  const { socket } = useContext(SocketContext);
  const getOrg = useGetOrg();
  const getRepo = useGetRepo();
  const [selected, setSelected] = useState('organization');
  const [isFocus, setIsFocus] = useState(false);
  const orgSearchResponse = useRecoilValue(commitLogModalOrgSearchState);
  const repoSearchResponse = useRecoilValue(commitLogModalRepoSearchState);
  const resetOrgResponse = useResetRecoilState(commitLogModalOrgSearchState);
  const resetRepoResponse = useResetRecoilState(commitLogModalRepoSearchState);
  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );

  const searchOptions = ['organization', 'repo'];

  const methods = useForm<commitLogFormType>({
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

  const onSubmit = (searchOptions: commitLogFormType) => {
    resetOrgResponse();
    resetRepoResponse();
    console.log(`searchOptions`, searchOptions);
    if (searchOptions.searchOptionsInput === 'organization') {
      console.log(searchOptions.searchOptionsInput);
      getOrg.mutate();
    } else {
      getRepo.mutate();
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    if (button.nextElementSibling && e.key === 'ArrowDown') {
      (button.nextElementSibling as HTMLButtonElement).focus();
    } else if (!button.nextElementSibling && e.key === 'ArrowDown') {
      (button.parentElement?.firstElementChild as HTMLButtonElement).focus();
    }
    if (button.previousElementSibling && e.key === 'ArrowUp') {
      (button.previousElementSibling as HTMLButtonElement).focus();
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
  console.log(`selected`, selected);
  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.commitLogModalBackground(isCommitLogFormModal)}
      ></div>
      <div css={styles.commitLogModalTransition(isCommitLogFormModal)}>
        <div css={styles.commitLogModalFormBox}>
          <HelpModal
            content={`내가 속한 organization 또는\n내가 만든 repository를 검색하고 우리의 프로젝트에 연결해 보세요!`}
          />
          <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div css={styles.commitLogFormBox}>
                <div css={styles.commitLogFormAlign}>
                  <label htmlFor={`organization`}>
                    <input
                      id={`organization`}
                      css={styles.commitLogModalOrgBtn}
                      type="radio"
                      value="organization"
                      name="searchOption"
                      checked={selected === 'organization'}
                      onChange={(e) => {
                        onChangeHandler({
                          value: e.target.value,
                          onChange: searchOptionsInput.onChange,
                        });
                      }}
                    />
                    organization
                  </label>
                  <label htmlFor={`repo`} css={styles.commitLogRepoLabel}>
                    <input
                      id={`repo`}
                      css={styles.commitLogModalRepoBtn}
                      type={'radio'}
                      value="repo"
                      name="searchOption"
                      checked={selected === 'repo'}
                      onChange={(e) => {
                        onChangeHandler({
                          value: e.target.value,
                          onChange: searchOptionsInput.onChange,
                        });
                      }}
                    />
                    repo
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
                  {orgSearchResponse.length !== 0 ? (
                    <div css={styles.ItemBox}>
                      <div css={styles.ItemBoxPadding}>
                        {orgSearchResponse.map((org, i) => {
                          return (
                            <button
                              key={i}
                              css={styles.orgItem}
                              type={'button'}
                              onKeyDown={onKeyDownHandler}
                              onFocus={() => setIsFocus(true)}
                              onBlur={() => setIsFocus(false)}
                            >
                              {org.orgImg !== '' ? (
                                <Image
                                  src={org.orgImg}
                                  width={40}
                                  height={40}
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
                  ) : repoSearchResponse.length !== 0 ? (
                    <div css={styles.ItemBox}>
                      <div css={styles.ItemBoxPadding}>
                        {repoSearchResponse.map((repo, i) => {
                          return (
                            <button
                              key={i}
                              css={styles.orgItem}
                              type={'button'}
                              onKeyDown={onKeyDownHandler}
                              onFocus={() => setIsFocus(true)}
                              onBlur={() => setIsFocus(false)}
                            >
                              <span css={styles.orgName}>{repo.name}</span>
                              <span css={styles.orgDesc}>{repo.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div css={styles.errorMessage}>
                      검색된 repository가 없어요
                    </div>
                  )}

                  {/* <div>
                    {orgSearchResponse.repos.map((repo, i) => {
                      return (
                        <div key={i} css={styles.orgRepoNameBox}>
                          {orgSearchResponse.orgImg !== '' ? (
                            <FontAwesomeIcon
                              icon={faArrowTurnUp}
                              rotation={90}
                            />
                          ) : null}
                          <span css={styles.orgRepoName}>{repo.name}</span>
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
              <button
                disabled={methods.formState.isSubmitting || !isFocus}
                css={styles.commitLogSubmitBtn(isFocus)}
                type="button"
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
