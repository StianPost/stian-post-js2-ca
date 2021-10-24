export const getAPI = async (url) => {
  try {
    const { data } = await axios.get(url);
    document.querySelector('.loading').innerHTML = '';
    return data;
  } catch (error) {
    alert('alert-danger', "Couldn't find data");
  }
};
