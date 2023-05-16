import * as styles from './styles';

export const Progress = () => {
  return (
    <div css={styles.commonBoxStyle}>
      <h3 css={styles.commonTitleStyle}>진행상황</h3>
      <div css={styles.content}></div>
    </div>
  );
};
