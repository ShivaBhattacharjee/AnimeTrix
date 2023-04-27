import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServerApi } from "./constants";
export default function Card(props) {
  const { rec } = props;
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

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
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        });
        const res = await axios.get(`${ServerApi}/user/bookmark/${userId}`)
        const bookmark = res.data;
        // console.log(bookmark);
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
        toast.error("Login first", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
    } catch (error) {
      setIsLoading(false);
      alert("Something went wrong please try again later");
      console.log(error);
    }
  };

  return (

    <>
      <div
        className="movie-card" >
        <ToastContainer/>
        <div className="card-head">

          <div className="bookmark-icon" onClick={toggleBookmark}>
            <i class={isLoading ? "fas fa-spinner fa-pulse" : (isBookmark ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark")} ></i>
          </div>
          <Link to={`/anime-details/${props.rec.id}`} onClick={() => props.handelClick()}>
            <img
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
            <h5 className="card-title">{props?.rec?.title?.userPreferred || props?.rec?.title?.english || props?.rec?.romaji}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
