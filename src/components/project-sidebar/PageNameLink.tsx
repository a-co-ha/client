import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';

import { useRouter } from 'next/router';
import * as styles from './styles';
import type { PageNameLinkProps } from './type';
import { useDeleteEditablePage } from '@/hooks/queries/editable/deletePage';

export const PageNameLink = (props: PageNameLinkProps) => {
  const router = useRouter();
  const pageName = useRecoilValue(pageNameShare(props.pageId));
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );

  const pageId = router.query.pageId;

  const deletePage = useDeleteEditablePage(
    props.channelId,
    props.pageId,
    props.type
  );

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageNameLink(props.pageId, pageId)}>
          <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900">
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
            <button
              css={styles.pageNameEditBtn}
              onClick={() => deletePage.mutate()}
            >
              🗑
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
