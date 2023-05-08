import { useForm } from 'react-hook-form';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { commitLogModalFormState } from '@/recoil/github/atom';
import { commitLogModalOrgSearchState } from '@/recoil/github/atom';
import { useGithubRepoForm } from '@/hooks/form/useGithubRepoForm';
import { useGetOrg } from '@/hooks/github/getHubOrg';
import { useGetRepo } from '@/hooks/github/getHubRepo';
import Image from 'next/image';
import * as styles from './styles';
import type { commitLogFormType } from './type';

export const CommitLogForm = ({
  channelId,
}: {
  channelId: string | string[] | undefined;
}) => {
  const { socket } = useContext(SocketContext);
  const getOrg = useGetOrg(channelId);
  const getRepo = useGetRepo();
  const orgSearchResponse = useRecoilValue(commitLogModalOrgSearchState);
  const resetOrgResponse = useResetRecoilState(commitLogModalOrgSearchState);
  const [isCommitLogFormModal, setIsCommitLogFormModal] = useRecoilState(
    commitLogModalFormState
  );

  const searchOptions = ['organization', 'repo'];

  const methods = useForm<commitLogFormType>({
    defaultValues: {
      searchOptionsInput: '',
      searchInput: '',
    },
    mode: 'onSubmit',
  });
  const {
    searchOptionsInput,
    searchInput,
    searchOptionError,
    isSubmitting,
    contentError,
  } = useGithubRepoForm({
    control: methods.control,
  });

  const onSubmit = (searchOptions: commitLogFormType) => {
    if (searchOptions.searchOptionsInput === 'organization') {
      getOrg.mutate(searchOptions.searchInput.trim());
    } else {
      getRepo.mutate(searchOptions.searchInput.trim());
    }

    console.log(`searchInput`, searchOptions);
    // setIsCommitLogFormModal(false);
    methods.resetField('searchInput');
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
    methods.reset();
  };

  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.commitLogModalBackground(isCommitLogFormModal)}
      ></div>
      <div css={styles.commitLogModalTransition(isCommitLogFormModal)}>
        <div css={styles.commitLogModalFormBox}>
          <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div css={styles.commitLogFormEditBox}>
                <div>
                  {searchOptions.map((searchOption) => {
                    return (
                      <div>
                        <label htmlFor={searchOption}>{searchOption}</label>
                        <input
                          id={searchOption}
                          css={styles.commitLogModalOrgBtn}
                          type="radio"
                          value={searchOption}
                          name="searchOption"
                          checked={!isCommitLogFormModal ? false : undefined}
                          onChange={searchOptionsInput.onChange}
                        />
                      </div>
                    );
                  })}
                </div>
                <input
                  autoFocus
                  css={styles.commitLogFormTitleInput(isCommitLogFormModal)}
                  value={searchInput.value}
                  onChange={searchInput.onChange}
                  onKeyDown={onKeyDownContentHandler}
                  name={searchInput.name}
                  spellCheck={false}
                  placeholder={`repository 이름으로 검색해 보세요`}
                />
                <div>
                  <div css={styles.orgImageBox}>
                    <div css={styles.orgImageAlign}>
                      {orgSearchResponse.orgImg !== '' ? (
                        <Image
                          src={orgSearchResponse.orgImg}
                          width={40}
                          height={40}
                          alt={`org image`}
                        />
                      ) : null}
                      <span>{orgSearchResponse.orgName}</span>
                    </div>
                  </div>
                  <div>
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
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  css={styles.commitLogFormBtn}
                  type="submit"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ color: '#f85d75' }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
