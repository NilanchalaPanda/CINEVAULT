import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner.jsx";
import Cast from "./cast/Cast.jsx";

const Details = () => {
  // MediaType == movie || tv
  const { mediaType, id } = useParams();
  console.log(mediaType, id);
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  console.log("vedio data :", data?.results[0]);

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
    </div>
  );
};

export default Details;
