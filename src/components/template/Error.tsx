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
        진행현황 템플릿 에러컴포넌트
      </button>
    </>
  );
};
