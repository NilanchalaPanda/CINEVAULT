import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import '../home.scss'
import { useState } from "react";

export const Trending = () => {

  // STATE MANAGEMENTS :
  const [endPoint, setEndPoint] = useState("day");

  // Fetch data for trending page
  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  // console.log(data?.results);

  const handleTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Trending</div>
        <SwitchTabs data={["Day", "Week"]} handleTabChange={handleTabChange} />
      </ContentWrapper>
    </div>
  );
};
