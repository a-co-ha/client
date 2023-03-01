import axios from 'axios';

export const postEditablePage = async (
  channelId: string | string[] | undefined
) => {
  const res = await axios.post(
    `http://localhost:3000/api/post?channel=${channelId}`
  );
  return [res.data._id, res.data.type];
};
