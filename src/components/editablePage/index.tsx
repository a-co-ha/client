export const EditablePage = ({ name }: any) => {
  console.log(name);
  return (
    <div>
      <div>{name.title}에디터블 샘플 페이지</div>
      <div>{name.text}</div>
    </div>
  );
};
