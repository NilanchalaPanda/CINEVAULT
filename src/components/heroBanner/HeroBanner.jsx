import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

const HeroBanner = () => {
  const { data, loading } = useFetch("/movie/upcoming");

  const navigate = useNavigate();

  const [bgImage, setBgImage] = useState();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const bg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    
    console.log(bg);
  }, [data]);

  const handleSearchInput = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <div className="heroBanner">
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
    </div>
  );
};

export default HeroBanner;
