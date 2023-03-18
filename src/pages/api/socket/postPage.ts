import axios from 'axios';

export const postSocketPage = async (channelId: string) => {
  const res = await axios.post(`/api/page/socket?channel=${channelId}`);
  console.log(res.data.pageName);
};
