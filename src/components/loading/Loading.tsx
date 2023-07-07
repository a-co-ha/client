import * as styles from './styles';

export const Loading = ({ position }: { position: string }) => {
  return (
    <div css={styles.loadingBackground(position)}>
      <p>Loading</p>
      <svg css={styles.loadingCircle}>
        <circle cx="50%" cy="50%" r="25"></circle>
      </svg>
    </div>
  );
};
