import React, { useRef } from "react";
// import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/Card";
import spinner from "../img/spinner.svg";

import { useFetchInitialData } from "../utils/hooks";

const DubAnime = (props, ref) => {
  const clientRef = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreDub();
  };

  const { loading, recent, loadMoreDub } = props;

  useFetchInitialData(loading, recent, loadMoreDub, clientRef, window)

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
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Dubbed Anime</h3>
              </div>
            </div>
            <div className="movies-grid" ref={clientRef}>
              {props.recent.map((rec) => (
                <Card rec={rec} key={rec.episodeId} handelClick={handelClick} />
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

export default DubAnime;
