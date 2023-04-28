import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import { useDeleteEditablePage } from '@/hooks/queries/editable/deletePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { PageNameLinkProps } from './type';
import { useDeletePageInTemplate } from '@/hooks/queries/template/useDeletePageInTemplate';

export const PageNameLink = (props: PageNameLinkProps) => {
  const router = useRouter();
  const pageName = useRecoilValue(pageNameShare(props.pageId));
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );
  const { mutate: deletePageInTemplate } = useDeletePageInTemplate(
    props.channelId,
    props.pageId,
    props.type
  );

  const pageId = router.query.pageId;

  const deletePage = useDeleteEditablePage(
    props.channelId,
    props.pageId,
    props.type
  );

  const onDelete = () => {
    if (props.type.endsWith('-page')) return deletePageInTemplate();
    deletePage.mutate();
  };

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageNameLinkBox(props.pageId, pageId)}>
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
              <FontAwesomeIcon
                icon={faPencil}
                size="sm"
                style={{ color: '#efb925' }}
              />
            </button>
            <button css={styles.pageNameEditBtn} onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
