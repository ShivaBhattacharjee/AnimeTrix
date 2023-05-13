import axios from "axios";
import React, { useEffect, useState, useRef, useId } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/";
import LoadingBar from "react-top-loading-bar";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookie from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeApi, ServerApi, StreamApi } from "../Components/constants";
import Hls from 'hls.js';
import Artplayer from "../Components/ArtPlayer";
import VideoPlayer from "../Components/VideoPlayer";
import StreamLoader from "../Loading/StreamLoader";
import DetailsLoader from "../Loading/DetailsLoader";

export default function Stream(props) {
  const { episodeId } = useParams()
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const { animeId } = useParams()
  const [loading, setLoading] = useState(true)
  const [stream, setstream] = useState([])
  const [detail, setDetail] = useState({});
  const [extraDetail, setextraDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [download, setDownload] = useState("")
  const [quality, setQuality] = useState([])
  const [displayArtPlayer, setDisplayArtPlayer] = useState(true);
  const [external, setExternal] = useState([])
  const navigate = useNavigate();
  const containerRef = useRef(null);
  let isMouseDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (event) => {
    isMouseDown = true;
    startX = event.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isMouseDown = false;
  };
  // Local Storage Key
  // const LOCAL_STORAGE_KEY = "animetrix-vercel-app";

  const addHistory = async () => {
    try {
      if (userId) {
        const response = await axios.post(
          `${ServerApi}/user/history`,
          {
            _id: userId,
            animeId: animeId,
            epId: episodeId,
          }
        );

        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ", {
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
  };


  const getComments = async () => {
    try {
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
      const res = await axios.get(`${ServerApi}/discussion/comments/${episodeId}`)
      if (res.data.comments)
        setComments(res.data.comments);
      else
        setComments([]);
    } catch (err) {
      console.log(err);
      toast.error("Error loading comments", {
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
  const getStream = async () => {
    try {
      const Video = await axios.get(
        `${HomeApi}/anime/gogoanime/watch/${episodeId}`
      );
      setData(Video?.data?.sources);
      setDownload(Video?.data?.download)
      setQuality(Video?.data?.sources)
      setExternal(Video?.data?.headers?.Referer)
      setLoading(false);
    }
    catch (err) {
      console.log("Error loading streaming data");
    }
  }

  const getDetails = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/info/${animeId}`)
      const response = await api.json()
      setDetail(response);
      const responseArray = [response];
      setextraDetail(responseArray)
    }
    catch (err) {
      console.log("Error loading details")
    }
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

  useEffect(() => {
    window.scrollTo(0, 0);
    addHistory();
  }, []);

  useEffect(() => {
    const id = getCookie("id");
    if (id)
      setUserId(id);
    addHistory();
    getDetails();
    getStream();
    getComments();
  }, [animeId, episodeId, userId]);

  const handleInternalClick = () => {
    setDisplayArtPlayer(true);
  };

  const handleExternalClick = () => {
    setDisplayArtPlayer(false);
  };

  const addComment = async (e) => {
    e.preventDefault();
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
        const res = await axios.post(`${ServerApi}/discussion/comment`, {
          sender: userId,
          _id: episodeId,
          comment: comment
        })
        getComments();
        setComment("");
        return res;
      }
      toast.error("Login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong please try again later", {
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

  const reportComment = async (comment) => {
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
        const res = await axios.post(`${ServerApi}/discussion/report`, {
          userId: userId,
          commentId: comment._id
        })
        getComments();
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return res;
      }
      toast.error("Login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong please try again later", {
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

  const deleteComment = async (comment) => {
    try {
      if (userId) {
        const conf = window.confirm("Are you Sure??");
        if (conf) {
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
          const res = await axios.delete(`${ServerApi}/discussion/comment/${comment._id}/${userId}`);
          getComments();
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return res;
        }
      }
      toast.error("Login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong please try again later", {
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

  const getLocalDate = (mongoTimestamp) => {
    const date = new Date(mongoTimestamp);
    const localDate = date.toLocaleString();
    const [dateStr, timeStr] = localDate.split(", ");
    return dateStr + " " + timeStr;
  }

  const printComments = () => {
    if (comments.length != 0) {
      return (
        <>
          {comments.map(comment => {
            return (
              <div className="user-comment">
                <div className="user-img">
                  <img src={comment.sender ? comment.sender.profile : "https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg"} alt="user-img" />
                </div>
                <div className="user-name-time-text">
                  <div className="user-name-time">
                    <span className="user-name">{comment.sender ? comment.sender.name : "User"}</span>
                    <span>{getLocalDate(comment.createdAt)}</span>
                  </div>
                  <div className="user-text">
                    <p>
                      {comment.comment}
                    </p>
                  </div>
                  <div className="reply-like-replies">
                    {/* <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button> */}
                    <button className={comment.reports.includes(userId) ? "active" : ""} onClick={e => reportComment(comment)}><i className="fa-solid fa-flag"></i>&nbsp;&nbsp;&nbsp;Report</button>
                    {comment.sender && comment.sender._id == userId ? <button onClick={e => { deleteComment(comment) }}><i className="fa-regular fa-trash-can"></i>&nbsp;&nbsp;&nbsp;Delete</button> : ""}
                  </div>
                </div>
              </div>
            )
          })}
        </>)
    } else {
      return (<h1>No Comments Posted</h1>)
    }
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
      {loading ? (
        <StreamLoader />
      ) : (
        <>
          <div className="stream" key={episodeId}>
            <div className="stream-container">
              <div className="video-title">
                <span>{detail.title?.romaji}</span>
                <p>
                  Note :- For ad-free experience, please use the internal player. If it's not working, external player with adblocker recommended to block ads.
                </p>
              </div>
              <br />
              <div className="video-player-list">
                {/* Video Player */}
                <div className="video-player">
                  {displayArtPlayer ?
                    <VideoPlayer
                      videoUrl={data}
                      download={download}
                      quality={quality}
                      title={episodeId}
                    /> : <><iframe
                      src={external}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen="allowfullscreen"
                      webkitallowfullscreen="true"
                      title={episodeId}
                    />
                    </>}
                </div>

                {/* Episode List */}
                <div className="list-box">
                  <div className="episode-list">
                    {detail?.episodes?.map((ep) => (
                      <>
                        <Link to={`/watch/${ep.id}/${animeId}`}>
                          {ep.id === episodeId ? (
                            <button className="active">
                              {ep.number}
                            </button>
                          ) : ep.number % 2 === 0 ? (
                            <button>{ep.number}</button>
                          ) : (
                            <button>{ep.number}</button>
                          )}
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <br /><br />
            <div className="player-change">
              <button onClick={handleInternalClick}>Internel Player</button>
              <button onClick={handleExternalClick}>External Player</button>
            </div>
            {extraDetail && extraDetail?.map((extra) => {
              return (
                <>
                  <div className="airing-extra-info">
                    {extra.nextAiringEpisode == undefined ? (
                      null
                    ) : (
                      <h2>
                        Episode {extra?.nextAiringEpisode?.episode} will air at{" "}
                        {new Date(
                          extra?.nextAiringEpisode?.airingTime * 1000
                        ).toLocaleString()}
                      </h2>
                    )}
                  </div>
                  <div className="previous-seasons">
                    {detail?.relations?.map((relatedSeason) => {
                      return (
                        <div className="related-seasons">
                          <Link to={`/anime-details/${relatedSeason?.id}`}>
                            <img src={relatedSeason.image} alt="" className="image-related" />
                          </Link>
                          <div className="title-and-type">
                            <h1>{relatedSeason?.title?.userPreferred}...</h1>
                            <span>{relatedSeason?.type}</span>
                          </div>
                        </div>
                      )

                    })}
                  </div>
                  <div className="characters-container">
                    <div className="characters-heading">
                      <h2>Characters</h2>
                    </div>
                    <div className="characters" onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp} ref={containerRef}>
                      {
                        extra.characters.map((character) => {
                          return <div className="character">
                            <img src={character.image} alt="" />
                            <p>{character.name.full}</p>
                          </div>
                        })
                      }
                    </div>
                  </div>
                </>
              )
            })}
            {/* discussion */}
            <div className="comments">
              <div className="comments-header">
                <h3>Comments</h3>
              </div>

              <div className="comment-section">
                <div className="send-comment">
                  <textarea
                    name=""
                    id=""
                    placeholder="Leave a comment"
                    value={comment}
                    onChange={e => { setComment(e.target.value) }}
                  ></textarea>
                  <button onClick={e => { addComment(e) }}>Comment</button>
                </div>

                <div className="comment-field">

                  {printComments()}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}