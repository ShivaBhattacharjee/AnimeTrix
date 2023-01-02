import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <div
        className="movie-card" onClick={() => props.handelClick()}>
        <Link to={`/anime-detail/${props.rec.animeId}`}>
          <div className="card-head">
            <img
              src={props.rec.animeImg}
              alt={props.rec.animeId}
              className="card-img"
            />
            <div className="">
              <h5 className="card-title">{(props.rec.animeTitle)}</h5>
              {props.ep !== "false" ? (
                <p className="card-info">

                </p>
              ) : null}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
