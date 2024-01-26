import { useSelector } from "react-redux";

import "./cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import avatar from "../../../../src/assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          // MAIN CONTENT -
          <div className="listItems">
            {data?.map((item) => {
              let avatarURL = item.profile_path
                ? url.profile + item.profile_path
                : avatar;

              return (
                <div className="listItem" key={item?.id}>
                  <div className="profileImg">
                    <LazyLoadImage src={avatarURL} />
                  </div>
                  <div className="name">{item?.name}</div>
                  <div className="character">{item?.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
