import axios from "axios";

const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;

export const fetchDataFromAPI = async (url, params) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
      params: {
        api_key: apiKey,
        params,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it at the calling site
  }
};
