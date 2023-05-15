import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import Footer from "../Components/Footer";
import ReactHtmlParser from 'react-html-parser';
import Card from "../Components/Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeApi } from "../Components/constants";
import DetailsLoader from "../Loading/DetailsLoader";
// import DetailsLoader from "../Loading/DetailsLoader";
export default function Details(props) {

  const { animeId } = useParams()
  const [detail, setDetail] = useState([]);
  const [watch, setWatch] = useState(" ");
  const [loading, setLoading] = useState(true)
  const handelClick = () => {
    props.handelClick();
    setLoading(true);
  };
  const getDetails = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/info/${animeId}`)
      const response = await api.json()
      const responseArray = [response];
      setDetail(responseArray);
      const [firstEpisode] = response.episodes;
      if (firstEpisode) {
        setWatch(firstEpisode.id);
      } else {
        setWatch("");
      }
      console.log(responseArray)
      setLoading(false);
    }
    catch (error) {
      toast.error("Error loading details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const AnimeLoading = () => {
    setLoading(true)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getDetails()
    AnimeLoading()
  }, [animeId]);


  if(loading){
    return(
      <DetailsLoader />
    )
  }
 
  return (
    <>
      <ToastContainer />
      <LoadingBar
        color='#0000FF'
        progress={100}
        height={5}
        shadow='true'
      />
      {/* {loading ? (
        <DetailsLoader />
      ) : (
        <> */}
          <div className="details" >
            {detail.map((animeDetails) => (
              <div key={animeId}>
                <div className="anime-details">

                  <div className="anime-img">
                    <img
                      src={animeDetails.image}
                      alt="anime-image"
                      className="anime-image"
                    />
                  </div>

                  <div className="anime-info">
                    {animeDetails.title.english && animeDetails.title.english ? (
                      <p className="anime-title">{animeDetails.title.english || animeDetails.title.romaji || animeDetails.title.romaji}</p>
                    ) : (
                      <p className="anime-title"> {animeDetails.title.romaji}</p>
                    )}
                    {watch && (
                      <Link to={`/watch/${watch}/${animeId}`}>
                        <button className="watch-anime-btn">Watch Now</button>
                      </Link>
                    )}
                    <div className="anime-storyline">
                      <div className="summary">Summary:-</div>
                      <p>{ReactHtmlParser(animeDetails.description)}</p>
                    </div>

                    <section className="episode-detail-container">

                      <div className="anime-episodes">
                        <div className="episodes-list">
                          {animeDetails.episodes.map((episodeWatch) => {
                            return (
                              <Link to={`/watch/${episodeWatch.id}/${animeId}`}>
                                <button>{episodeWatch.number}</button>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="anime-trailer">
                  <div className="trailer">
                    {animeDetails.trailer && (
                      <iframe src={`https://www.youtube.com/embed/${animeDetails.trailer.id}`} name={animeDetails.animeId} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                    )}
                  </div>
                </div>
                {animeDetails && animeDetails?.recommendations == false ? (
                  null
                ) : (
                  <div className="recommended-anime">
                    <h1>Recommended Anime</h1>
                  </div>
                )}
                <div className="movies-grid">
                  {animeDetails?.recommendations?.map((rec) => (
                    <>
                      <Card rec={rec} key={rec.id} handelClick={handelClick}  />
                    </>
                  ))}
                </div>
              </div>
            ))}
          </div>
        {/* </>
      )} */}
      <Footer />
    </>
  );

  
}
