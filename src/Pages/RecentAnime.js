import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/spinner.svg";
import Card from "../Components/Card";
import Lastwatch from "../Components/Lastwatch"
import Slider from "../Components/slider";
import { useFetchInitialData } from "../utils/hooks";

const RecentAnime = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreRecent();
  };

  // get lastwatch anime
  const [lastwatch, setLastwatch] = useState(null);
  // Localstroage key
  const LOCAL_STORAGE_KEY = "animix-netlify-app";
  useState(() => {
    const fetchLastWatch = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (fetchLastWatch)
      setLastwatch(fetchLastWatch);
  }, []);

  const { loading, recent, loadMoreRecent } = props;

  useFetchInitialData(loading, recent, loadMoreRecent, ref, window)

  return (
    <>
      <Slider />
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
          <br /><br />
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Recently Added</h3>
              </div>
            </div>

            <div className="movies-grid" ref={ref}>
              {props.recent &&
                props.recent.map((rec) => (
                  <Card rec={rec} key={rec.episodeId} handelClick={handelClick} />
                ))}
            </div>
            {/* <img src={spinner} alt="" /> */}
            <InfiniteScroll
              dataLength={props.recent.length}
              next={loadMore}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
            ></InfiniteScroll>

            <Lastwatch lastwatch={lastwatch} />
          </section>
        </>
      )}
    </>
  );
};
export default RecentAnime;
