import { page } from '@/components/editablePage/types';
import { GetServerSideProps } from 'next';
import { EditablePage } from '@/components/editablePage';
import axios from 'axios';
import { resetServerContext } from 'react-beautiful-dnd';

const Page = ({ id, fetchedBlocks, err }: page) => {
  return <EditablePage id={id} fetchedBlocks={fetchedBlocks} err={err} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext();
  const pageId = context.query.pid;
  try {
    const response = await axios.get(`http://localhost:3000/page/${pageId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const blocks = response.data.page.blocks;
    console.log(blocks);
    return {
      props: { fetchedBlocks: blocks, id: pageId, err: false },
    };
  } catch (err) {
    // console.log(err);
    return { props: { fetchedBlocks: null, id: null, err: true } };
  }
};

export default Page;
