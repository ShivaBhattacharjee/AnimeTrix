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
          <Link to={`/anime-details/${props.rec.id}`}>
            <img
              src={props.rec.image}
              alt={props.rec.id}
              className="card-img"
            />
          </Link>
          <div className="card-details">
            <div className="episode-total">
              <span>{(props.rec.totalEpisodes)}</span>
              <span>{(props.rec.rating/10)}</span>
            </div>
            <h5 className="card-title">{(props.rec.title.userPreferred)}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
