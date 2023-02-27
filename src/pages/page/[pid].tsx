import { GetServerSideProps } from 'next';
import { EditablePage } from '@/components/editable-page';
import axios from 'axios';
import { resetServerContext } from 'react-beautiful-dnd';
import type { EditablePages } from '@/components/editable-page/types';

const Page = ({ id, fetchedBlocks, err }: EditablePages) => {
  return <EditablePage id={id} fetchedBlocks={fetchedBlocks} err={err} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext();
  console.log(context);
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
