import { useEffect } from "react";
import { fetchDataFromAPI } from "../utils/api";

function App() {
  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = async () => {
    try {
      const data = await fetchDataFromAPI("/movie/popular", {});
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <div>HELLO</div>;
}

export default App;
