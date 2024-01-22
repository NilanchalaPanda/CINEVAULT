import HeroBanner from "../../components/heroBanner/HeroBanner";
import { Popular } from "./popular/Popular";
import { Trending } from "./trending/Trending";
import { TopRated } from "./topRated/TopRated";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
