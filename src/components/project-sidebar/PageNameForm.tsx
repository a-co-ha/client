import { useRecoilState } from 'recoil';
import { pageNameState } from '@/recoil/project/atom';

export const PageNameForm = ({ id }: { id: string }) => {
  const [pageName, setPageName] = useRecoilState(pageNameState(id));

  // const onChangeHandler

  return (
    <div>
      <input type="text" />
    </div>
  );
};

/** export default React.memo(TodoItem); */
