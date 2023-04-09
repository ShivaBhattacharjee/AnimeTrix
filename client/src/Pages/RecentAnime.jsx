import React, { useState, useRef } from "react";

import { Card, Lastwatch, Slider } from "../Components"
import { NewSeason } from "../Pages"

import { useFetchInitialData } from "../utils/hooks";

const RecentAnime = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };




  const [lastwatch, setLastwatch] = useState(null);

  const LOCAL_STORAGE_KEY = "animetrix-vercel-app"

  useState(() => {
    const fetchLastWatch = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (fetchLastWatch) {
      setLastwatch(fetchLastWatch);
    }
  }, []);

  const { loading, recent, loadMoreRecent } = props;

  useFetchInitialData(loading, recent, loadMoreRecent, ref, window)

  return (
    <>
      <Slider />
      {Object.keys(props.recent).length === 0 ? (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
      ) : (
        <>
          <Lastwatch lastwatch={lastwatch} />
          <NewSeason />
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
                  <Card rec={rec} key={rec.animeId} handelClick={handelClick} />
                ))}
            </div>
            <div className="loadmore-recent">
              <button onClick={loadMoreRecent} className="loadmore">LOAD MORE</button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default RecentAnime;
