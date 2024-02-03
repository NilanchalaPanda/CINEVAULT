import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

import "./SearchResult.scss";

import { fetchDataFromAPI } from "../../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import noResults from "../../../src/assets/no-results.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  // API CALL
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromAPI(
        `/search/multi?query=${query}&page=${pageNum}`
      );

      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }

      setPageNum((prev) => prev + 1);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading ? (
        <Spinner initial={true} />
      ) : (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data.total_results > 1 ? "results" : "result"
              } of '${query}' `}</div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return;

                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <span className="resultNotFound">Sorry, Results not found!</span>
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
