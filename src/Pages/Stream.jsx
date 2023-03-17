import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Components/Footer";

export default function Stream(props) {
  const { episodeId } = useParams();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  const animeId = location.state.animeID;
  const [lastwatch, setLastwatch] = useState(null);

  // Local Storage Key
  const LOCAL_STORAGE_KEY = "AnimeTrix";
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
        .get(`https://gogoanime-api-dc2c.up.railway.app/anime-details/${animeId}`)
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
      });

      setDetail(Detail.data);
    };
    getDetail();
    getVideo();
  }, [animeId, episodeId]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastwatch));
  }, [lastwatch]);

  // const openInNewTab = url => {
  //   window.open(url, '_blank', 'noopener,noreferrer')
  // }
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
                <p>Note :- Refresh the page if the player doesnt load (server except Vidstreaming might contain ads use an adblocker to block ads)</p>
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
                              <button className="active">{ep.episodeNum}</button>
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
            </div>
          </div>
          <Footer/>
        </>

      ) : (

        <div class="spinner-box">
          <div class="configure-border-1">
            <div class="configure-core"></div>
          </div>
          <div class="configure-border-2">
            <div class="configure-core"></div>
          </div>
        </div>

      )
      }
    </>
  );
}
