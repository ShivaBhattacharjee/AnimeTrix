
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { Footer } from "../Components/";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function Stream(props) {
  const { episodeId } = useParams();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  const animeId = location.state.animeID;
  const [lastwatch, setLastwatch] = useState(null);

  // Local Storage Key
  const LOCAL_STORAGE_KEY = "animetrix-vercel-app";
  useEffect(() => {
    const getVideo = async () => {
      try {
        const Video = await axios.get(
          `https://gogoanime-api-dc2c.up.railway.app/vidcdn/watch/${episodeId}`
        );
        setData(Video.data.Referer);
      } catch (err) {
        console.log("Connection Error");
      }
    };

    const getDetail = async () => {
      const Detail = await axios
        .get(
          `https://gogoanime-api-dc2c.up.railway.app/anime-details/${animeId}`
        )
        .catch((err) => console.log("Connection Error"));

      const temp = episodeId;
      const ep = Detail.data.episodesList.find(
        ({ episodeId }) => episodeId === temp
      );

      setLastwatch({
        ep: ep.episodeNum,
        title: Detail.data.animeTitle,
        url: window.location.pathname,
        animeId: animeId,
        coverimg: Detail.data.animeImg,
      });

      setDetail(Detail.data);
    };
    getDetail();
    getVideo();
  }, [animeId, episodeId]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastwatch));
  }, [lastwatch]);

  // reply logic
  const [showReplyTextArea, setShowReplyTextArea] = useState(false)

  const handleReplyClick = () => {
    setShowReplyTextArea(!showReplyTextArea)
  }

  
  
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Best site to watch Anime English Sub/Dub online Free and download Anime English Sub/Dub anime.`}
          charSet="utf-8"
        />
        <meta
          name="keywords"
          content={`${detail.animeTitle} English Sub/Dub, free ${detail.animeTitle} online, watch ${detail.animeTitle} online, watch ${detail.animeTitle} free, download ${detail.animeTitle} anime, download ${detail.animeTitle} free`}
          charSet="utf-8"
        />
        <title>{`Watching ${detail.animeTitle} on AnimeTrix`}</title>
        <link rel="canonical" href={`/vidcdn/watch/${episodeId}`} />
      </Helmet>
      {Object.keys(data).length !== 0 ? (
        <>
          <div className="stream">
            <div className="stream-container">
              <div className="video-title">
                <span>{detail.animeTitle}</span>
                <p>
                  Note :- Refresh the page if the player doesnt load (server
                  except Vidstreaming might contain ads use an adblocker to
                  block ads)
                </p>
              </div>

              <div className="video-player-list">
                {/* Video Player */}
                <div className="video-player">
                  <iframe
                    src={data}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen="allowfullscreen"
                    webkitallowfullscreen="true"
                    title={animeId}
                  />
                </div>
                {/* Episode List */}
                <div className="list-box">
                  <div className="episode-list">
                    {detail.episodesList &&
                      detail.episodesList
                        .slice(0)
                        .reverse()
                        .map((ep) => (
                          <Link
                            to={`/vidcdn/watch/${ep.episodeId}`}
                            state={{ animeID: `${animeId}` }}
                            key={ep.episodeNum}
                          >
                            {ep.episodeId === episodeId ? (
                              <button className="active">
                                {ep.episodeNum}
                              </button>
                            ) : ep.episodeNum % 2 === 0 ? (
                              <button>{ep.episodeNum}</button>
                            ) : (
                              <button>{ep.episodeNum}</button>
                            )}
                          </Link>
                        ))}
                  </div>
                </div>
              </div>

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
                    ></textarea>
                    <button>Comment</button>
                  </div>

                  <div className="comment-field">

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-image" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Guts</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Architecto exercitationem dicta quas quasi
                            repellendus, voluptatem deserunt perferendis quam
                            dolore molestiae quis commodi beatae accusantium
                            minima veniam quibusdam, consequatur cupiditate
                            aliquid?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button onClick={handleReplyClick}><ReplyIcon /></button>
                          <button className="like-active"><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>

                        <div className={showReplyTextArea ?  "reply-textarea" : 'hide' }>
                          <textarea name="" id="" placeholder="Leave a comment"></textarea>
                          <button>Send Comment</button>
                        </div>
                      </div>
                    </div>

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Girffith</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Architecto exercitationem dicta quas quasi
                            repellendus, voluptatem deserunt perferendis quam
                            dolore molestiae quis commodi beatae accusantium
                            minima veniam quibusdam, consequatur cupiditate
                            aliquid?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button  onClick={handleReplyClick}><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Architecto exercitationem dicta quas quasi
                            repellendus, voluptatem deserunt perferendis quam
                            dolore molestiae quis commodi beatae accusantium
                            minima veniam quibusdam, consequatur cupiditate
                            aliquid?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Big as paragraph cause why not?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, exercitationem tempora ipsum atque nihil consequuntur, ad nulla voluptatem rem, voluptas mollitia eius! Iure, pariatur! Eaque, libero! Quidem incidunt obcaecati veritatis?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Big as paragraph cause why not?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, exercitationem tempora ipsum atque nihil consequuntur, ad nulla voluptatem rem, voluptas mollitia eius! Iure, pariatur! Eaque, libero! Quidem incidunt obcaecati veritatis?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>


                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Big as paragraph cause why not?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, exercitationem tempora ipsum atque nihil consequuntur, ad nulla voluptatem rem, voluptas mollitia eius! Iure, pariatur! Eaque, libero! Quidem incidunt obcaecati veritatis?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>


                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Big as paragraph cause why not?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, exercitationem tempora ipsum atque nihil consequuntur, ad nulla voluptatem rem, voluptas mollitia eius! Iure, pariatur! Eaque, libero! Quidem incidunt obcaecati veritatis?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>


                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Big as paragraph cause why not?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, exercitationem tempora ipsum atque nihil consequuntur, ad nulla voluptatem rem, voluptas mollitia eius! Iure, pariatur! Eaque, libero! Quidem incidunt obcaecati veritatis?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>

                    <div className="user-comment">
                      <div className="user-img">
                        <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-img" />
                      </div>
                      <div className="user-name-time-text">
                        <div className="user-name-time">
                          <span className="user-name">Casca</span>
                          <span>12:00 AM</span>
                        </div>
                        <div className="user-text">
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Architecto exercitationem dicta quas quasi
                            repellendus, voluptatem deserunt perferendis quam
                            dolore molestiae quis commodi beatae accusantium
                            minima veniam quibusdam, consequatur cupiditate
                            aliquid?
                          </p>
                        </div>
                        <div className="reply-like-replies">
                          <button><ReplyIcon /></button>
                          <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button>
                          <button> 10 Replies</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
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
    </>
  );
}