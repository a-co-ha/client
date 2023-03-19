import * as styles from './styles';

export const Loading = () => {
  return (
    <div css={styles.loadingBackground}>
      <p>Loading</p>
      <svg css={styles.loadingCircle}>
        <circle cx="50%" cy="50%" r="25"></circle>
      </svg>
    </div>
  );
};
