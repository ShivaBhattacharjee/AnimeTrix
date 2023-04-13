import React, { useState, useRef, useEffect } from "react";

import { Card, Lastwatch, Slider } from "../Components"
import { NewSeason } from "../Pages"

import { useFetchInitialData } from "../utils/hooks";

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
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Airing Schedule</h3>
              </div>
            </div>
            <div className="movies-grid" ref={ref}>
              {airingList.map((airingData) => (
                <div key={airingData.id}>
                  <div>
                    <img src={airingData.image} alt=""/>
                  <p>Name : {airingData.title.userPreferred}</p>
                  <p>country : {airingData.country}</p>
                  <p>Genres: {airingData.genres.slice(0,2)}</p>
                  <p>episode: {airingData.episode}</p>
                  <p>airing at : {new Date(airingData.airingAt * 1000).toLocaleString()}</p>
                  <p>type:{airingData.type}</p>
                  <p>rating : {airingData.rating/10}</p>
                  </div>
                </div>
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default RecentAnime;
