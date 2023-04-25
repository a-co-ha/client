interface ErrorProps {
  onReset: () => void;
}

export const Error = ({ onReset }: ErrorProps) => {
  return (
    <>
      <button
        onClick={() => {
          onReset();
        }}
      >
        문서 페이지 에러컴포넌트
      </button>
    </>
  );
};
