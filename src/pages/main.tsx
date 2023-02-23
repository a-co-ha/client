import { useRecoilValue } from 'recoil';
import { userProfile } from '@/recoil/user/atom';
import Image from 'next/image';

export default function Main() {
  const userData = useRecoilValue(userProfile);
  console.log(userData);

  return (
    <div>
      <div>메인페이지</div>
      <div>id:{userData.id}</div>
      {/* <Image
        src={userData.avartarUrl}
        alt="userProfile Image"
        width={50}
        height={50}
      /> */}
    </div>
  );
}
