import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import "../home.scss";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";

export const TopRated = () => {
  // STATE MANAGEMENTS :
  const [endPoint, setEndPoint] = useState("movie");

  // Fetch data for Popular page
  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  // console.log(data?.results);

  const handleTabChange = (tab) => {
    setEndPoint(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Top Rated</div>
        <SwitchTabs
          data={["Movie", "TV Show"]}
          handleTabChange={handleTabChange}
        />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};
