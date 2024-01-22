import { useEffect } from "react";
import { fetchDataFromAPI } from "../utils/api";
import { useDispatch } from "react-redux";
import { getAPIConfiguration, getGenres } from "./store/homeSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// NAVIGATION PAGES -
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAPIConifg();
    genresCall();
  }, []);

  const fetchAPIConifg = async () => {
    try {
      const data = await fetchDataFromAPI("/configuration", {});
      // console.log("CONFIG : ", data);

      const url = {
        backdrop: `${data.images.base_url}original`,
        poster: `${data.images.base_url}original`,
        profile: `${data.images.base_url}original`,
      };

      dispatch(getAPIConfiguration(url));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const genresCall = async () => {
    let promises = [];
    let allGenres = {};
    let endPoints = ["movie", "tv"];

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* MediaType: Movies or TVShows. */}
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        {/* Infinite Scrolling Page for Movie OR TVShows */}
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
