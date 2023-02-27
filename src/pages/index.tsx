import { GetServerSideProps } from 'next';
import axios from 'axios';
import { EditablePage } from '@/components/editable-page';
import { EditablePages } from '@/components/editable-page/types';

const IndexPage = ({ id, fetchedBlocks, err }: EditablePages) => {
  return <EditablePage id={id} fetchedBlocks={fetchedBlocks} err={err} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.res;
  try {
    const response = await axios.post(`http://localhost:3000/pages`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const pageId = response.data.pageId;
    const creator = response.data.creator;
    const query = !creator ? '?public=true' : '';
    res.writeHead(302, { Location: `/page/${pageId}` });
    res.end();
    return { props: {} };
  } catch (err) {
    console.log(err);
    return {
      props: { fetchedBlocks: null, id: null, err: true },
    };
  }
};

export default IndexPage;
