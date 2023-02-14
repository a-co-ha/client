import axios from 'axios';
import { block } from '../types';

export const updatePageOnserver = async (blocks: block[], id: string) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/pages/${id}`,
      {
        blocks,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    return console.log(err);
  }
};
