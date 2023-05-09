import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import * as styles from '@/components/project-main/styles';

export const HelpModal = ({ content }: { content: string }) => {
  return (
    <div>
      <div css={styles.helpModal}>
        <button>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
        <div css={styles.helpModalContent}>{content}</div>
      </div>
    </div>
  );
};
