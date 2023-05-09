import { useForm } from 'react-hook-form';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
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
  const orgSearchResponse = useRecoilValue(commitLogModalOrgSearchState);
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

  const onKeyDownContentHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) return;
    // e.preventDefault();
    // if (e.key === 'Enter' && e.shiftKey) {
    //   return;
    // }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsCommitLogFormModal(false);
    resetOrgResponse();
    resetRepoResponse();
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
            content={`내가 속한 organization 또는, 내가 만든 repository를 검색하고 우리의 프로젝트에 연결해 보세요!`}
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
                      icon={faPaperPlane}
                      style={{ color: '#f85d75' }}
                    />
                  </button>
                </div>

                <div>
                  {orgSearchResponse.length !== 0 ? (
                    <div css={styles.orgItemBox}>
                      {orgSearchResponse.map((org, i) => {
                        return (
                          <div css={{ width: `100%` }}>
                            <button
                              key={i}
                              css={styles.orgItem}
                              type={'button'}
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
                            </button>
                            <button
                              key={i + 1}
                              css={styles.orgItem}
                              type={'button'}
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
                            </button>
                            <button
                              key={i + 2}
                              css={styles.orgItem}
                              type={'button'}
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
                            </button>
                            <button
                              key={i + 3}
                              css={styles.orgItem}
                              type={'button'}
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
                            </button>
                            <button
                              key={i + 4}
                              css={styles.orgItem}
                              type={'button'}
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
                            </button>
                          </div>
                        );
                      })}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
