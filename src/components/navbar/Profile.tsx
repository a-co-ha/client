import * as styles from './styles';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { channelNameState } from '@/recoil/project/atom';
import Image from 'next/image';

export const Profile = () => {
  const router = useRouter();
  const { data: user } = useGetUser();
  const resetProfile = useResetRecoilState(loginState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const onClickHandler = () => {
    deleteCookie(`refreshToken`);
    deleteCookie(`accessToken`);
    resetProfile();
    resetChannelName();
    router.replace(`/`);
  };

  console.log(user);
  return (
    <div css={styles.profileBox}>
      {user && (
        <div css={styles.profileInnerBox}>
          <div css={styles.profileImageBox}>
            <Image src={user.img} alt="" width={100} height={100} />{' '}
          </div>
          <button css={{ fontSize: '12px' }}>{user.name}</button>
          <button css={{ marginLeft: '4px' }} onClick={onClickHandler}>
            🚪
          </button>
        </div>
      )}
    </div>
  );
};
