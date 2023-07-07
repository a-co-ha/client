import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import * as styles from '@/components/project-main/styles';

export const HelpModal = ({
  content,
  direction,
  image = '',
}: {
  content: string;
  direction?: string;
  image?: string;
}) => {
  return (
    <div css={styles.helpModal}>
      <button>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
      <div css={styles.helpModalContent(direction)}>
        {content}
        {image !== '' ? (
          <Image src={image} width={200} height={200} alt="help image" />
        ) : null}
      </div>
    </div>
  );
};
