// import { useEffect } from "react";
// import { fetchDataFromAPI } from "../utils/api";
// import { useDispatch } from "react-redux";
// import { getAPIConfiguration } from "./store/homeSlice";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// NAVIGATION PAGES -
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* MediaType: Movies or TVShows. */}
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        {/* Infinite Scrolling Page for Movie OR TVShows */}
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
