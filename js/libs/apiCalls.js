import { BASE_URL } from '../configs/configs.js';

export const getAPI = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {}
};
