import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  changeProjectImgModalState,
  channelImageState,
  channelNameState,
} from '@/recoil/project/atom';
import { usePorjectChangeImgForm } from '@/hooks/form/useProjectChangeImgForm';
import * as styles from './styles';
import type { ProjectChangeImage } from './type';
import { HelpModal } from '@/hooks/useHelpModal';
import { useEffect } from 'react';
import { usePatchProjectImage } from '@/hooks/queries/project/patchProjectImage';

export const ProjectImageModal = ({
  channelId,
}: {
  channelId: string | string[] | undefined;
}) => {
  const [isChangeImgModal, setIsChangeImgModal] = useRecoilState(
    changeProjectImgModalState
  );
  const channelName = useRecoilValue(channelNameState);
  const channelImageValue = useRecoilValue(channelImageState);
  const [channelImage, setChannelImage] = useState('');
  const patchProjectImage = usePatchProjectImage(channelId);

  useEffect(() => {
    setChannelImage(channelImageValue);
    console.log(channelImage);
  }, [channelImageValue]);

  const methods = useForm<ProjectChangeImage>({
    defaultValues: {
      projectChangeImage: '',
    },
    mode: 'onChange',
  });

  const { projectChangeImage, isSubmitting } = usePorjectChangeImgForm({
    control: methods.control,
  });

  const onClickHandler = () => {
    setIsChangeImgModal(false);
    setChannelImage(channelImageValue);
  };

  const onChangeHandler = ({
    onChange,
    target,
  }: {
    onChange: (file: any) => void;
    target: HTMLInputElement;
  }) => {
    if (target.files && target.files.length > 0) {
      console.log(target.files[0]);

      const url = URL.createObjectURL(target.files[0]);
      setChannelImage(url);
      onChange(target.files[0]);
    }
  };

  const onSubmit = async (channelImg: any) => {
    console.log(`imageChange`, channelImg);
    try {
      patchProjectImage.mutate(channelImg.projectChangeImage);
      setChannelImage(channelImage);
      methods.reset();
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
        <div className="w-[70vw] max-w-[400px] h-[50vw] max-h-[400px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <div css={styles.projectChangeImgModalFormBox}>
            <div>
              <HelpModal
                content={`프로젝트 이미지를 바꿔보세요!\n이미지를 업로드하면 미리보기가 가능해요`}
              />
            </div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                <button css={styles.projectChangeImgSubmitBtn}>
                  이미지 변경하기
                </button>
              </div>
            </form>
            <div css={styles.projectChangeImgName}>{channelName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
