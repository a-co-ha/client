import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import { useDeleteEditablePage } from '@/hooks/queries/editable/deletePage';
import { useDeleteSocketPage } from '@/hooks/queries/socket/deletePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { PageNameLinkProps } from './type';
import { useDeletePageInTemplate } from '@/hooks/queries/template/useDeletePageInTemplate';
import { useState } from 'react';

export const PageNameLink = (props: PageNameLinkProps) => {
  const router = useRouter();
  const pageName = useRecoilValue(pageNameShare(props.pageId));
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );
  const [isClicked, setIsClicked] = useState(false);
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

  const socketPage = useDeleteSocketPage(props.channelId, props.pageId);
  const onDelete = () => {
    if (props.type.endsWith('-page')) return deletePageInTemplate();
    if (props.type === 'socket') {
      socketPage.mutate();
    } else {
      deletePage.mutate();
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div>
      {!isEditing ? (
        <div css={styles.pageNameLinkBox(props.pageId, pageId, isClicked)}>
          <div css={styles.pageNameLink}>
            <Link
              css={styles.pageNameLinkTag}
              href={`/project/${props.channelId}/${props.pageId}?name=${props.pageName}&type=${props.type}`}
            >
              {pageName}
            </Link>
            <button
              css={styles.pageNameEditBtn}
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faPencil} size="sm" />
            </button>
            <button
              css={styles.pageNameDeleteBtn(isClicked)}
              onClick={onClickHandler}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <div css={styles.pageNameDeleteConfirmBtn(isClicked)}>
              <button onClick={onDeleteHandler}>삭제</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
