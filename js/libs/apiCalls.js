import { BASE_URL } from '../configs/configs.js';

export const getAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/articles`);
    return data;
  } catch (error) {}
};
