import { GetServerSideProps } from 'next';
import axios from 'axios';
import { EditablePage } from '@/components/editablePage';
import { useRecoilValue } from 'recoil';
import { blocksState } from '@/recoil/editableBlock/atom';

interface msgType {
  data: {
    title: string;
    text: string;
  };
}

const IndexPage = (props: msgType) => {
  return <EditablePage name={props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blocks = useRecoilValue(blocksState);

  const datas = await axios.post(
    `http://localhost:3000/test`,
    { blocks },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return {
    props: datas.data,
  };
};

export default IndexPage;
