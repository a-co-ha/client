import { useProjectChangeImageForm } from '@/hooks/form/useProjectChangeImgForm';
import { useProjectChangeNameForm } from '@/hooks/form/useProjectChangeNameForm';
import { usePatchProjectImage } from '@/hooks/queries/project/patchProjectImage';
import { usePatchProjectName } from '@/hooks/queries/project/patchProjectName';
import { HelpModal } from '@/hooks/useHelpModal';
import {
  changeProjectImgModalState,
  changeProjectNameEditToggle,
  channelImageState,
  channelNameState,
} from '@/recoil/project/atom';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as styles from './styles';
import type { ProjectChangeInfo, ProjectChangeName } from './type';

export const ProjectImageModal = ({
  channelId,
  channelNameValue,
}: {
  channelId: string | string[] | undefined;
  channelNameValue: string;
}) => {
  const [isChangeImgModal, setIsChangeImgModal] = useRecoilState(
    changeProjectImgModalState
  );
  const [isEditing, setIsEditing] = useRecoilState(
    changeProjectNameEditToggle(channelId)
  );
  const channelImageValue = useRecoilValue(channelImageState);
  const [channelImage, setChannelImage] = useState('');
  const [channelName, setChannelName] = useRecoilState(channelNameState);
  const patchProjectImage = usePatchProjectImage(channelId);
  const patchProjectName = usePatchProjectName(channelId);
  const channelNameRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    setChannelImage(channelImageValue);
  }, [channelImageValue]);

  const imageMethods = useForm<ProjectChangeInfo>({
    defaultValues: {
      projectChangeImage: '',
    },
    mode: 'onChange',
  });

  const nameMethods = useForm<ProjectChangeName>({
    defaultValues: {
      projectChangeName: channelName,
    },
    mode: 'onChange',
  });

  const { projectChangeImage, imageError, imageIsSubmitting } =
    useProjectChangeImageForm({
      control: imageMethods.control,
    });

  const { projectChangeName, nameError, nameIsSubmitting } =
    useProjectChangeNameForm({
      control: nameMethods.control,
    });

  const onClickHandler = () => {
    setIsEditing(false);
    setIsChangeImgModal(false);
    setChannelImage(channelImageValue);
    nameMethods.reset();
  };

  const onChangeHandler = ({
    onChange,
    target,
  }: {
    onChange: (file: any) => void;
    target: HTMLInputElement;
  }) => {
    if (target.files && target.files.length > 0) {
      target.files[0];

      const url = URL.createObjectURL(target.files[0]);
      setChannelImage(url);
      onChange(target.files[0]);
    }
  };

  const onkeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === `Enter`) {
      e.preventDefault();
      if (projectChangeName.value === '') {
        toast.error(`너무 짧아요 (최소 1자)`);
        return;
      }
      setIsEditing(false);
    }
  };

  const projectChangeNameHandler = () => {
    setIsEditing(true);
  };

  const imageFormOnSubmit = async (projectInfo: ProjectChangeInfo) => {
    try {
      patchProjectImage.mutate(projectInfo);
      setChannelImage(channelImage);
    } catch (err) {
      console.error(err);
    }
  };

  const nameFormOnSubmit = async (projectInfo: ProjectChangeName) => {
    try {
      patchProjectName.mutate(projectInfo);
      toast.success('페이지 이름을 바꿨어요');
      // setChannelName(projectChangeName.value);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div css={styles.projectChangeImgModalBox(isChangeImgModal)}>
      <div
        onClick={onClickHandler}
        css={styles.projectChangeImgModalBackground(isChangeImgModal)}
      ></div>
      <div css={styles.projectChangeImgModalTransition(isChangeImgModal)}>
        <div className="w-[70vw] max-w-[400px] h-[75vw] max-h-[400px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <div css={styles.projectChangeImgModalFormBox}>
            <div>
              <h3>프로젝트 정보 변경</h3>
              <HelpModal
                content={`프로젝트 이미지를 바꿔보세요!\n이미지를 업로드하면 미리보기가 가능해요`}
                direction={`left`}
              />
            </div>
            <form
              css={styles.projectChangeImgForm}
              onSubmit={imageMethods.handleSubmit(imageFormOnSubmit)}
            >
              <div css={styles.projectChangeImgInputBox}>
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      id="shapeSquircle"
                      d="M50 25C50 43.4095 43.4095 50 25 50C6.59051 50 0 43.4095 0 25C0 6.59051 6.59051 0 25 0C43.4095 0 50 6.59051 50 25Z"
                    ></path>
                    <clipPath id="clipSquircle">
                      <use xlinkHref="#shapeSquircle" />
                    </clipPath>
                  </defs>
                  <image
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clipSquircle)"
                    xlinkHref={`${channelImage}`}
                  />
                </svg>
                <label
                  css={styles.projectChangeImgLabel}
                  htmlFor="projectChangeImg"
                >
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50 25C50 43.4095 43.4095 50 25 50C6.59051 50 0 43.4095 0 25C0 6.59051 6.59051 0 25 0C43.4095 0 50 6.59051 50 25Z"
                      fill="rgba(0,0,0,0.2)"
                    />
                  </svg>
                </label>
                <input
                  id="projectChangeImg"
                  type={`file`}
                  accept={`image/*`}
                  css={styles.projectChangeImgInput}
                  onChange={(e) =>
                    onChangeHandler({
                      onChange: projectChangeImage.onChange,
                      target: e.target,
                    })
                  }
                  name={projectChangeImage.name}
                  placeholder={`channelImg`}
                />
              </div>
              <div css={styles.projectChangeImgSubmitBtnBox}>
                <button type={`submit`} css={styles.projectChangeImgSubmitBtn}>
                  이미지 변경하기
                </button>
              </div>
            </form>
            <form
              css={styles.projectChangeNameForm}
              onSubmit={nameMethods.handleSubmit(nameFormOnSubmit)}
            >
              <div css={styles.projectChangeNameBox}>
                {isEditing ? (
                  <input
                    ref={channelNameRef}
                    css={styles.projectChangeNameInput}
                    value={projectChangeName.value}
                    onChange={projectChangeName.onChange}
                    name={projectChangeName.name}
                    // onKeyDown={onkeydownHandler}
                    autoFocus
                  />
                ) : (
                  <div css={styles.projectChangeNameDiv}>
                    {channelName}
                    <div
                      css={styles.projectChangeNameDivIcon}
                      onClick={projectChangeNameHandler}
                    >
                      <FontAwesomeIcon icon={faPencil} size="xs" />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
