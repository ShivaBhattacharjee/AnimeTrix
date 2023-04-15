import React, { useState, useRef, useEffect } from "react";

import { Card, Lastwatch, Slider } from "../Components"
import { NewSeason } from "../Pages"

import { useFetchInitialData } from "../utils/hooks";
import AiringSchedule from "../Components/AiringSchedule";

const RecentAnime = (props) => {
  const renderAfterCalled = useRef(false);
    const [airingList, setairingList] = useState([])
    const getAiring = async () => {
      try{
        const api = await fetch(`https://api.consumet.org/meta/anilist/airing-schedule?notYetAired=true`)
        const response = await api.json()
        setairingList(response.results)
      }
      catch(error){
        console.log("Error loading top airing list")
      }
    }
    useEffect(() => {
        if (!renderAfterCalled.current) {
            getAiring()
        }
        renderAfterCalled.current = true;
    }, []);
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

          <AiringSchedule airingList={airingList} ref={ref}/>
        </>
      )}
    </>
  );
};
export default RecentAnime;
