import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import "../home.scss";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";

export const Popular = () => {
  // STATE MANAGEMENTS :
  const [endPoint, setEndPoint] = useState("movie");

  // Fetch data for Popular page
  const { data, loading } = useFetch(`/${endPoint}/popular`);

  // console.log(data?.results);

  const handleTabChange = (tab) => {
    setEndPoint(tab === "Movie" ? "movie" : "tv");
  };

  console.log("popular ka endpont : ", endPoint);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">What's Popular</div>
        <SwitchTabs
          data={["Movie", "TV Show"]}
          handleTabChange={handleTabChange}
        />
      </ContentWrapper>


      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

// POPULAR