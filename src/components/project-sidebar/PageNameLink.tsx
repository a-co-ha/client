import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import * as styles from './styles';
import type { PageNameLinkProps } from './type';

export const PageNameLink = (props: PageNameLinkProps) => {
  const pageName = useRecoilValue(pageNameShare(props.pageId));
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageNameLink}>
          <Link
            href={`/project/${props.channelId}/${props.pageId}?name=${props.pageName}&type=${props.type}`}
          >
            {pageName}
          </Link>
          <button
            css={styles.pageNameEditBtn}
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
        </div>
      ) : null}
    </div>
  );
};
