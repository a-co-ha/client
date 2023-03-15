import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { pageTitleEditToggle } from '@/recoil/project/atom';
import * as styles from './styles';
import type { PageTitleLinkProps } from './types';

export const PageTitleLink = (props: PageTitleLinkProps) => {
  const [isEditing, setIsEditing] = useRecoilState(
    pageTitleEditToggle(props.pageId)
  );
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditing(true);
  };

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageTitleLink}>
          <Link
            href={`/project/${props.channelId}/${props.pageId}?name=${props.pageTitle}&type=${props.type}`}
          >
            {props.pageTitle}
          </Link>
          <button css={styles.pageTitleEditBtn} onClick={onClickHandler}>
            ✏️
          </button>
        </div>
      ) : null}
    </div>
  );
};
