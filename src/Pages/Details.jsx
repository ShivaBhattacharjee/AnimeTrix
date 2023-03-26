import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import Footer from "../Components/Footer";


export default function Details(props) {

  
  const { animeId } = useParams();

  const [detail, setDetail] = useState([]);
  const [watch, setWatch] = useState("");
  useEffect(() => {
    const getDetail = async () => {
      const Detail = await axios
        .get(`https://gogoanime-api-dc2c.up.railway.app/anime-details/${animeId}`)
        .catch((err) => console.log(`Error loading details of ${animeId}`));
      setDetail(Detail.data);
      let n = Detail.data.episodesList.length;
      setWatch(Detail.data.episodesList[n - 1].episodeId);
    };
    getDetail();
  }, [animeId]);

  return (
    <>
      <LoadingBar
        color='#0000FF'
        progress={100}
        height={5}
        shadow='true'
      />
      <div className="details">

        {Object.keys(detail).length !== 0 ? (

          <div className="anime-details">

            <div className="anime-img">
              <img
                src={detail.animeImg}
                alt={detail.animeTitle}
              />
            </div>

            <div className="anime-info">

              <p className="anime-title">{detail.animeTitle}</p>
              <div className="watch-anime">
                <button className="watch-anime-btn">
                  <Link
                    to={`/watch/${watch}`}
                    state={{ animeID: `${animeId}` }}
                    onClick={() => {
                      props.handelClick();
                    }}
                  >Watch Now</Link></button>
              </div>

              <div className="anime-storyline">
                <div className="summary">Summary : -</div>
                <p>{detail.synopsis}</p>
              </div>
            </div>
          </div>
        ) : (

          <div className="spinner-box">
            <div className="configure-border-1">
              <div className="configure-core"></div>
            </div>
            <div className="configure-border-2">
              <div className="configure-core"></div>
            </div>
          </div>

        )}
      </div>
      <Footer />
    </>
  );
}
