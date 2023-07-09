import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../Components/";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeApi, ServerApi, StreamApi } from "../Components/constants";
import StreamLoader from "../Loading/StreamLoader";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { Helmet } from 'react-helmet';
export default function Stream(props) {
  const { episodeId } = useParams();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const { animeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [extraDetail, setextraDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [nspl, setnspl] = useState([]);
  const [displayPlyr, setDisplayPlyr] = useState(false);
  const containerRef = useRef(null);
  const [videoDub, setVideoDub] = useState([]);
  const [download, setDownload] = useState("")
  const [dubList, setDubList] = useState(false);

  // Dub Api data
  const dubStream = async () => {
    setLoading(true);
    try {
      const dubVideo = await axios.get(
        `${StreamApi}/api/v2/episode/${animeId}?dub=true`
      );
      setVideoDub(dubVideo?.data);
    } catch (err) {
      showErrorToast("Error loading streaming data");
    }
    setLoading(false);
  };

  const dubSwitchClick = () => {
    setDubList(!dubList);
  };


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

  const addHistory = async () => {
    try {
      if (userId) {
        const response = await axios.post(`${ServerApi}/user/history`, {
          _id: userId,
          animeId: animeId,
          epId: episodeId,
        });

        return response.data;
      }
    } catch (error) {
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          showErrorToast(error.response.data.error);
          return;
        }
      );
      const res = await axios.get(
        `${ServerApi}/discussion/comments/${episodeId}`
      );
      if (res.data.comments) setComments(res.data.comments);
      else setComments([]);
    } catch (err) {
      showErrorToast("Error loading comments");
    }
  };
  const getStream = async () => {

    try {
      const Video = await axios.get(
        `${StreamApi}/api/v2/stream/${episodeId}`
      );
      if (Video.length === 0) {
        setLoading(true);
      }
      setnspl(Video?.data?.nspl?.main);
      setData(Video?.data?.plyr?.main);
      console.log(data)
      setLoading(false);
    } catch (err) {
      showErrorToast("Error loading streaming data");
    }
  };
  const getDownload = async () => {

    try {
      const Api = await axios.get(
        `${HomeApi}/anime/gogoanime/watch/${episodeId}`
      );
      setDownload(Api?.data?.download)
    } catch (err) {
      showErrorToast("Error loading download");
    }
  };

  const handlePlyr = () => {
    setDisplayPlyr(false);
  };
  const handleNspl = () => {
    setDisplayPlyr(true);
  };
  const getDetails = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/info/${animeId}`);
      const response = await api.json();
      setDetail(response);
      const responseArray = [response];
      setextraDetail(responseArray);
    } catch (err) {
      showErrorToast("Error loading details");
    }
  };

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    addHistory();
    dubStream();
  }, []);

  useEffect(() => {
    const id = getCookie("id");
    if (id) setUserId(id);
    addHistory();
    getDetails();
    getStream();
    getDownload()
    getComments();
  }, [animeId, episodeId, userId]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        axios.interceptors.response.use(
          (response) => {
            return response;
          },
          (error) => {
            showErrorToast(error.response.data.error);
            return;
          }
        );
        const res = await axios.post(`${ServerApi}/discussion/comment`, {
          sender: userId,
          _id: episodeId,
          comment: comment,
        });
        getComments();
        setComment("");
        return res;
      }
      showErrorToast("Login first");
    } catch (err) {
      showErrorToast("Something went wrong");
    }
  };

  const reportComment = async (comment) => {
    try {
      if (userId) {
        axios.interceptors.response.use(
          (response) => {
            return response;
          },
          (error) => {
            showErrorToast(error.response.data.error);
            return;
          }
        );
        const res = await axios.post(`${ServerApi}/discussion/report`, {
          userId: userId,
          commentId: comment._id,
        });
        getComments();
        showSuccessToast(res.data.message);
        return res;
      }
      showErrorToast("Login First");
    } catch (err) {
      showErrorToast("Something went wrong please try again later");
    }
  };

  const deleteComment = async (comment) => {
    try {
      if (userId) {
        const conf = window.confirm("Are you Sure??");
        if (conf) {
          axios.interceptors.response.use(
            (response) => {
              return response;
            },
            (error) => {
              showErrorToast(error.response.data.error);
              return;
            }
          );
          const res = await axios.delete(
            `${ServerApi}/discussion/comment/${comment._id}/${userId}`
          );
          getComments();
          showSuccessToast(res.data.message);
          return res;
        }
      }
      showErrorToast("Login First");
    } catch (err) {
      showErrorToast("Something went wrong please try again later");
    }
  };

  const getLocalDate = (mongoTimestamp) => {
    const date = new Date(mongoTimestamp);
    const localDate = date.toLocaleString();
    const [dateStr, timeStr] = localDate.split(", ");
    return dateStr + " " + timeStr;
  };

  const printComments = () => {
    if (comments.length !== 0) {
      return (
        <>
          {comments.map((comment) => {
            return (
              <div className="user-comment">
                <div className="user-img">
                  <img
                    src={
                      comment.sender
                        ? comment.sender.profile
                        : "https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg"
                    }
                    alt="user-img"
                  />
                </div>
                <div className="user-name-time-text">
                  <div className="user-name-time">
                    <span className="user-name">
                      {comment.sender ? comment.sender.name : "User"}
                    </span>
                    <span>{getLocalDate(comment.createdAt)}</span>
                  </div>
                  <div className="user-text">
                    <p>{comment.comment}</p>
                  </div>
                  <div className="reply-like-replies">
                    {/* <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button> */}
                    <button
                      className={
                        comment.reports.includes(userId) ? "active" : ""
                      }
                      onClick={(e) => reportComment(comment)}
                    >
                      <i className="fa-solid fa-flag"></i>
                      &nbsp;&nbsp;&nbsp;Report
                    </button>
                    {comment.sender && comment.sender._id === userId ? (
                      <button
                        onClick={(e) => {
                          deleteComment(comment);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                        &nbsp;&nbsp;&nbsp;Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return <h1>No Comments Posted</h1>;
    }
  };


  return (
    <>
      <Helmet>
        <title>You are now watching {episodeId} on AnimeTrix</title>
        <meta property="og:title" content="AnimeTrix" />
        <meta property="og:description" content={`Watch or download ${episodeId} for free on Animetrix `} />
        <meta property="og:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />
        <meta property="og:url" content="https://animetrix.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />
        <meta name="twitter:title" content="Animetrix" />
        <meta name="twitter:description" content={`Watch or download ${episodeId} for free on Animetrix `}/>
        <meta name="twitter:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />
      </Helmet>
      <ToastContainer />
      <LoadingBar color="#0000FF" progress={100} height={5} shadow="true" />
      {loading ? (
        <StreamLoader />
      ) : (
        <>
          <div className="stream" key={episodeId}>
            <div className="stream-container">
              <div className="video-title">
                <span>{detail.title?.romaji}</span>
                <p>
                  Note :- Refresh the page if player doesnt load or change to nspl player.
                  <br />
                  To play the dubbed version, change the episode to the next available dub episode.
                </p>
              </div>
              <div className="playerchange-div">
                {videoDub.length > 0 && <button onClick={() => dubSwitchClick()}>{dubList ? "Sub" : "Dub"}</button>}
                <i class="fa fa-download" aria-hidden="true" onClick={() => window.open(download)}></i>
                <i class="fa-solid fa-location-arrow" onClick={handlePlyr}></i>
                <i class="fa-solid fa-server" onClick={handleNspl}></i>
              </div>
              <div className="video-player-list">
                {/* Video Player */}
                <div className="video-player">
                  {displayPlyr ? (
                    <iframe
                      src={nspl}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen="allowfullscreen"
                      webkitallowfullscreen="true"
                      title={episodeId}
                      allow="picture-in-picture"
                    ></iframe>
                  ) : (
                    <iframe
                      src={data}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen="allowfullscreen"
                      webkitallowfullscreen="true"
                      title={episodeId}
                      allow="picture-in-picture"
                    ></iframe>
                  )}
                </div>

                {/* Episode List */}
<div className="list-box">
  <div className="episode-list">
    {dubList ? (
      videoDub.map((dublist) => {
        const { id, number } = dublist;
        return (
          <Link to={`/watch/${id}/${animeId}`} key={id}>
            {id === episodeId ? (
              <button className="active">{number}</button>
            ) : (
              <button>{number}</button>
            )}
          </Link>
        );
      })
    ) : (
      detail?.episodes?.slice().sort((a, b) => a.number - b.number).map((ep) => (
        <Link to={`/watch/${ep.id}/${animeId}`} key={ep.id}>
          {ep.id === episodeId ? (
            <button className="active">{ep.number}</button>
          ) : (
            <button>{ep.number}</button>
          )}
        </Link>
      ))
    )}
  </div>
</div>


              </div>
            </div>
            {extraDetail &&
              extraDetail?.map((extra) => {
                return (
                  <>
                    <div className="airing-extra-info">
                      {extra.nextAiringEpisode === undefined ? null : (
                        <h2>
                          Episode {extra?.nextAiringEpisode?.episode} will air
                          at{" "}
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
                              <img
                                src={relatedSeason.image}
                                alt=""
                                className="image-related"
                              />
                            </Link>
                            <div className="title-and-type">
                              <h1>{relatedSeason?.title?.userPreferred}...</h1>
                              <span>{relatedSeason?.type}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="characters-container">
                      <div className="characters-heading">
                        <h2>Characters</h2>
                      </div>
                      <div
                        className="characters"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        ref={containerRef}
                      >
                        {extra.characters.map((character) => {
                          return (
                            <div className="character">
                              <img src={character.image} alt="" />
                              <p>{character.name.full}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
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
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                  <button
                    onClick={(e) => {
                      addComment(e);
                    }}
                  >
                    Comment
                  </button>
                </div>

                <div className="comment-field">{printComments()}</div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
