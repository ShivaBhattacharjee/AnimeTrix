import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServerApi } from "./constants";
import {  LazyLoadImage } from "react-lazy-load-image-component";
import { showErrorToast } from "../utils/toast";
export default function Card(props) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const goToBtn = () => {
    window.scrollTo({ top:0, left: 0, behavior: "smooth" })
}
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
  }

  const [bookmark, setBookmark] = useState([]);



  useEffect(() => {
    const id = getCookie("id");
    setUserId(id);
  });

  useEffect(() => {
    getBookmarks();
  }, [userId]);


  const getBookmarks = async () => {
    try {
      if (userId) {
        axios.interceptors.response.use(response => {
          return response;
        }, error => {
          showErrorToast(error.response.data.error);
          return;
        });
        const res = await axios.get(`${ServerApi}/user/bookmark/${userId}`)
        const bookmark = res.data;
        setBookmark(bookmark);
        bookmark.includes(props.rec.id) ? setIsBookmark(true) : setIsBookmark(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const toggleBookmark = async () => {
    try {
      setIsLoading(true);
      if (props.removeBookmark)
        props.removeBookmark(props.rec.id);
      if (userId) {
        const response = await axios.post(
          `${ServerApi}/user/bookmark`,
          {
            _id: userId,
            animeId: props.rec.id,
          }
        );
        setIsBookmark(!isBookmark);
        setIsLoading(false);
      } else {
        showErrorToast('Login first!');
      }
    } catch (error) {
      setIsLoading(false);
      showErrorToast('Something went wrong');
    }
  };

  return (

    <>
      <div
        className="movie-card" >
        <ToastContainer />
        <div className="card-head">

          <div className="bookmark-icon" onClick={toggleBookmark}>
            <i class={isLoading ? "fas fa-spinner fa-pulse" : (isBookmark ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark")} ></i>
          </div>
          <Link to={`/anime-details/${props.rec.id}`} onClick={() => { props.handelClick(); goToBtn(); }}>
            <LazyLoadImage
              src={props.rec.image}
              alt={props.rec.id}
              className="card-img"
            />
          </Link>
          <div className="card-details">
            <div className="episode-total">
              <span>{(props.rec.type)}</span>
              <span>{(props.rec.rating / 10)}</span>
            </div>
            {props?.rec?.title?.english && props?.rec?.title?.english ? (
              <h5 className="card-title">{props?.rec?.title?.english }</h5>
            ) : (
              <p className="card-title"> {props?.rec?.title?.romaji}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}