import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./carousel.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyImage from "../../components/lazyLoadImages/LazyImage";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRaing";

const Carousel = ({ data, loading }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const carouselContainer = useRef();

  const navigation = (direction) => {};

  // SKELETON LOADING ANIMATION -
  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeft arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRight arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems">
            {data?.map((item) => {
              const posterURL = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <LazyImage src={posterURL} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>

                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>

                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
