import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import LoadingBar from 'react-top-loading-bar';
export default function Details(props) {
  const { animeId } = useParams();

  const [detail, setDetail] = useState([]);
  const [watch, setWatch] = useState("");
  useEffect(() => {
    const getDetail = async () => {
      const Detail = await axios
        .get(`https://gogoanime.consumet.org/anime-details/${animeId}`)
        .catch((err) => console.log("Connection Error"));
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
        style={{ borderRadius: 90 }}
      />
      <div className="anime-details">
        {Object.keys(detail).length !== 0 ? (
          <div className="details-all">
            <div className="details-img">
              <img
                src={detail.animeImg}
                alt={detail.animeTitle}
              />
              <div className="details-info">
                <p className="details-text">
                  {detail.animeTitle}
                </p>
                <div className="stream">
                  <Link
                    to={`/vidcdn/watch/${watch}`}
                    state={{ animeID: `${animeId}` }}
                    onClick={() => {
                      props.handelClick();
                    }}
                  >
                    <button className="btn-watch">Watch Now</button>
                  </Link>
                </div>
                <div className="storyline">
                  <span className="summmary-heading">Summary:- </span>
                  <br /><br />
                  <p>{detail.synopsis}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner-box">
            <div className="configure-border">
              <div className="configure-core"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
