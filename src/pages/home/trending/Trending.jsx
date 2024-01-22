import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

export const Trending = () => {
  const { data, loading } = useFetch("/trending/person/day");

  console.log(data?.results);

  const handleTabChange = (tab) => {};

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Trending</div>
        <SwitchTabs data={["Day", "Week"]} handleTabChange={handleTabChange} />
      </ContentWrapper>
    </div>
  );
};
