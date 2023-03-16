import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { pageNameEditToggle } from '@/recoil/project/atom';
import * as styles from './styles';
import type { PageNameLinkProps } from './types';

export const PageNameLink = (props: PageNameLinkProps) => {
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditing(true);
  };

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageNameLink}>
          <Link
            href={`/project/${props.channelId}/${props.pageId}?name=${props.pageName}&type=${props.type}`}
          >
            {props.pageName}
          </Link>
          <button css={styles.pageNameEditBtn} onClick={onClickHandler}>
            ✏️
          </button>
        </div>
      ) : null}
    </div>
  );
};
