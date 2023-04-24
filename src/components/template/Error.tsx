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
        editable page 에러컴포넌트
      </button>
    </>
  );
};
