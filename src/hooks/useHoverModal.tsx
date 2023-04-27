import * as styles from '@/components/project-sidebar/styles';

export const HoverModal = ({ content }: { content: string }) => {
  return (
    <div css={styles.projectThumbnailHoverModal}>
      {content}
      <div css={styles.projectThumbnailModalLeftArrow}></div>
    </div>
  );
};
