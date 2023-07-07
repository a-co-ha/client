interface ErrorProps {
  onReset: () => void;
}

export const Error = ({ onReset }: ErrorProps) => {
  return (
    <div
      css={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => {
          onReset();
        }}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <img src="/images/channelImg/9.png" alt="에러이미지" width="100px" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <p>
          데이터를 불러오는데 실패했습니다. <br />
          다시 시도해주세요.
        </p>
      </button>
    </div>
  );
};
