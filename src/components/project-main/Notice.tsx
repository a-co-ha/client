import { css } from '@emotion/react';
export const Notice = () => {
  return (
    <section css={Container}>
      <h2>공지사항</h2>
      <ul>{}</ul>
    </section>
  );
};

const Container = css`
  display: flex;
  width: 30rem;
  border: solid 1px;
  height: 20rem;
  padding: 1rem;
`;
