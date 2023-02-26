import axios from 'axios';

export const postEditablePage = async (channelId: string) => {
  const res = await axios.post(
    `http://localhost:3000/api/post?channel=${channelId}`
  );
  console.log(res.data.pageName);
};
