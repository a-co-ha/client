import { GetServerSideProps } from 'next';
import axios from 'axios';
import { EditablePage } from '@/components/editablePage';

interface msgType {
  data: {
    title: string;
    text: string;
  };
}

const IndexPage = (props: msgType) => {
  return <EditablePage name={props.data} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blocks = [{ tag: 'p', html: '', imageUrl: '' }];

  const datas = await axios.post(
    `http://localhost:3000/test`,
    { blocks },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = datas.data;
  console.log(datas);
  return {
    props: {
      data,
    },
  };
};

export default IndexPage;
