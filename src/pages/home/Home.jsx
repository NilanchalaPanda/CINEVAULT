import HeroBanner from "../../components/heroBanner/HeroBanner";
import { Popular } from "./popular/Popular";
import { Trending } from "./trending/Trending";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
    </>
  );
};

export default Home;
