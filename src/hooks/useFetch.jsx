// const apiTesting = async () => {
//   try {
//     const data = await fetchDataFromAPI("/discover/movie", {});
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDataFromAPI(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong! ", err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
