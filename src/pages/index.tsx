import { GetServerSideProps } from 'next';
import axios from 'axios';
import { EditablePage } from '@/components/editablePage';
import { page } from '@/components/editablePage/types';

const IndexPage = ({ id, fetchedBlocks, err }: page) => {
  return <EditablePage id={id} fetchedBlocks={fetchedBlocks} err={err} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blocks = [{ tag: 'p', html: '', imageUrl: '' }];
  const res = context.res;
  try {
    const response = await axios.post(
      `http://localhost:3000/pages`,
      { blocks },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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
