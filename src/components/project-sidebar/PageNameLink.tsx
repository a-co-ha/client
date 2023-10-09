import Link from 'next/link';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { pageNameEditToggle, pageNameShare } from '@/recoil/project/atom';
import { messageStatusState, messageReadState } from '@/recoil/socket/atom';
import { useRouter } from 'next/router';
import { useDeleteEditablePage } from '@/hooks/queries/editable/deletePage';
import { useDeleteSocketPage } from '@/hooks/queries/socket/deletePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { PageNameLinkProps } from './type';
import { useDeletePageInTemplate } from '@/hooks/queries/template/useDeletePageInTemplate';
import { useEffect, useState } from 'react';

export const PageNameLink = (props: PageNameLinkProps) => {
  const router = useRouter();
  const pageName = useRecoilValue(pageNameShare(props.pageId));
  const messageStatus = useRecoilValue(messageStatusState);
  const [isRead, setIsRead] = useRecoilState(messageReadState(props.pageId));
  const [isEditing, setIsEditing] = useRecoilState(
    pageNameEditToggle(props.pageId)
  );
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const unReadRoomArray = messageStatus.filter((room) => {
      return room.status.isRead === `false`;
    });
    let isReadRoom = unReadRoomArray.some((room) => {
      return room.status.roomId.indexOf(props.pageId) === -1;
    });
    if (unReadRoomArray.length === 0) {
      setIsRead(true);
    } else {
      isReadRoom ? setIsRead(true) : setIsRead(false);
    }
  }, [messageStatus]);

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
        <div
          css={styles.pageNameLinkBox(
            props.pageId,
            pageId,
            isClicked,
            isRead,
            props.type
          )}
        >
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
