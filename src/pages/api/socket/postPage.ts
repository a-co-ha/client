import axios from 'axios';

export const postSocketPage = async (channelId: string) => {
  const res = await axios.post(
    `http://localhost:3000/api/post/socket?channel=${channelId}`
  );
  console.log(res.data.pageName);
};
