import axios from 'axios';
import { Block } from '../types';

export const updatePageOnserver = async (blocks: Block[], id: string) => {
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
  } catch (err) {
    return console.log(err);
  }
};
