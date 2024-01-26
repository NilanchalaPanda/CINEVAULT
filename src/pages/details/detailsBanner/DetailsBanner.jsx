import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./detailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Genres from "../../../components/genre/Genres.jsx";
import CircleRating from "../../../components/circleRating/CircleRaing.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn.jsx";
import VideoPopup from "../../../components/videoPopUp/VideoPopup.jsx";

  const [show, setShow] = useState(false);
  const [videoID, setVideoID] = useState(null);

  // MediaType == movie || tv
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writers = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Writer" || f.job === "Story"
  );

  const { url } = useSelector((state) => state.home);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <LazyLoadImage
                  src={url?.backdrop + data.backdrop_path}
                  alt="IMAGE"
                />
              </div>

              <div className="opacity-layer"></div>

              {/* MAIN CONTENT */}

              <ContentWrapper>
                <div className="content">
                  {/* POSTER IMAGE */}
                  <div className="left">
                    {data.poster_path ? (
                      <LazyLoadImage
                        src={url?.poster + data.poster_path}
                        alt="IMAGE"
                        className="posterImg"
                      />
                    ) : (
                      <LazyLoadImage
                        src={PosterFallback}
                        alt="IMAGE"
                        className="posterImg"
                      />
                    )}
                  </div>

                  {/* RIGHT INFO */}
                  <div className="right">
                    {/* TITLE */}
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data?.release_data).format("YYYY")})`}</div>

                    <div className="subtitle">{data.tagline}</div>
                    {/* GENRES & CATEGORIES */}
                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(2)} />

                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          console.log(video);
                          setVideoID(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    {/* Row Ended */}

                    {/* OVERVIEW */}
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    {/* INFO */}
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_data).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* DIRECTORS */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Direcotr : </span>

                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* WRITERS */}
                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : </span>

                        <span className="text">
                          {writers?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writers.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* FOR TV SHOWS */}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator : </span>

                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoID={videoID}
                  setVideoID={setVideoID}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
