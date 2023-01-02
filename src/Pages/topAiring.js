import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/spinner.svg";
import Card from "../Components/Card";

import { useFetchInitialData } from "../utils/hooks";

const TopAnimeAiring = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreTopAnime();
  };

  const { loading, topanime, loadMoreTopAnime } = props;

  useFetchInitialData(loading, topanime, loadMoreTopAnime, ref, window)

  return (
    <>
      {Object.keys(props.recent).length === 0 ? (
        <div class="spinner-box">
        <div class="configure-border-1">
          <div class="configure-core"></div>
        </div>
        <div class="configure-border-2">
          <div class="configure-core"></div>
        </div>
      </div>
      ) : (
        <>
          <br /><br /><br /><br /><br /><br />
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Top-Airing</h3>
              </div>
            </div>

            <div className="movies-grid" ref={ref}>
              {props.recent.map((rec) => (
                <Card
                  rec={rec}
                  key={rec.animeId} handelClick={handelClick}
                  ep="false" />
              ))}
            </div>
            <InfiniteScroll
              dataLength={props.recent.length}
              next={loadMore}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
            ></InfiniteScroll>
          </section>
        </>
      )}
    </>
  );
};

export default TopAnimeAiring;
