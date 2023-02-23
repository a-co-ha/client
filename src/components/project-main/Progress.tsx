import * as styles from './styles';

export const Progress = () => {
  return (
    <div css={styles.contentBox}>
      <h3 css={styles.contentBoxTitle}>진행상황</h3>
      <div css={styles.content}></div>
    </div>
  );
};
