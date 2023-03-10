import axios from 'axios';

export const postProject = async () => {
  const res = await axios.post(`http://localhost:3001/api/channel/create`);
  return { id: res.data.id, channelName: res.data.channelName };
};
