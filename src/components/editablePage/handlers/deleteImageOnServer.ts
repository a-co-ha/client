import axios from 'axios';

/**
 * imageUrl endPoint로 요청하면 routing으로 fs.unlink(filePath) 함
 * backend/controllers/pages.js/deleteImage 참조
 *
 */
export const deleteImageOnServer = async (imageUrl: string) => {
  try {
    const res = await axios.delete(`http://localhost:3000/pages/${imageUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
  } catch (err) {
    return console.log(err);
  }
};
