import * as styles from './styles';

export const CommitLogNavbar = () => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const parent = target.parentElement as HTMLDivElement;
    parent
      .querySelector(`[aria-selected='true']`)
      ?.setAttribute(`aria-selected`, 'false');
    target.setAttribute(`aria-selected`, 'true');

    (
      parent.querySelector(`[aria-selected='true']`) as HTMLButtonElement
    ).style.backgroundColor = `#ffd6dc`;
    (
      parent.querySelector(`[aria-selected='true']`) as HTMLButtonElement
    ).style.color = `black`;

    const falseList = parent.querySelectorAll(`[aria-selected='false']`);
    falseList.forEach(
      (button) => (
        ((button as HTMLButtonElement).style.backgroundColor = `white`),
        ((button as HTMLButtonElement).style.color = `black`)
      )
    );
  };

  return (
    <div css={styles.commitLogNavBtnBox}>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="true"
      >
        커밋
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        이슈
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        통계
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        기타
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        기타
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        기타
      </button>
      <button
        css={styles.commitLogNavBtn}
        onClick={onClickHandler}
        aria-selected="false"
      >
        기타
      </button>
    </div>
  );
};
