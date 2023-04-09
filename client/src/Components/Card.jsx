import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <div
        className="movie-card" onClick={() => props.handelClick()}>
        <div className="card-head">
          <div className="bookmark-icon">
            <i class="fa-solid fa-bookmark"></i>
          </div>
          <Link to={`/anime-details/${props.rec.animeId}`}>
            <img
              src={props.rec.animeImg}
              alt={props.rec.animeId}
              className="card-img"
            />
          </Link>
          <div className="card-details">
            <div className="episode-total">
              <span>{(props.rec.subOrDub)}</span>
              <span>{(props.rec.episodeNum)}</span>
            </div>
            <h5 className="card-title">{(props.rec.animeTitle)}</h5>
            {props.ep !== "false" ? (
              <div className="card-info">
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
