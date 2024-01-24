import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../../hooks/useFetch";

import LazyImage from "../lazyLoadImages/LazyImage";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./heroBanner.scss";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  const navigate = useNavigate();

  // STATE HOOKS -
  const [bgImage, setBgImage] = useState();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBgImage(bg);
  }, [data]);

  const handleSearchInput = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <LazyImage src={bgImage} />
        </div>
      )}
      <div className="opacity-layer" />

      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV Shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for new movie/TV Show"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={handleSearchInput}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
