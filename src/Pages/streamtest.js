import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactPlayer from "react-player";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Stream(props) {
  const { episodeId } = useParams();

  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  const animeId = location.state.animeID;
  const [lastwatch, setLastwatch] = useState(null);
  // Localstroage key
  const LOCAL_STORAGE_KEY = "animix-netlify-app";
  useEffect(() => {
    const getVideo = async () => {
      try {
        const Video = await axios.get(
          `https://api.consumet.org/meta/anilist/watch/${episodeId}`
        );
        setData(Video.data.sources[0].url);
      } catch (err) {
        console.log("Connection Error");
      }

    };
    const getDetail = async () => {
      const Detail = await axios
        .get(`https://gogoanime.consumet.org/anime-details/${animeId}`)
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

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer')
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
        <link rel="canonical" href={`//vidcdn/watch/${episodeId}`} />
      </Helmet>
      {Object.keys(data).length !== 0 ? (
        <>
          {/* Video */}
          <div className="container-stream">
            <div className="video-player">
              <div className="video-title">
                <span>{detail.animeTitle}</span>
                <p>Refresh the page if the player doesnt load (server except Vidstreaming might contain ads use an adblocker to block ads)</p>
              </div>
              <ReactPlayer
                url={data}
                controls={true}
                width='100%'
                height='100%'
              />
            </div>
          </div>
          <div className="episode-list">
            {detail.episodesList &&
              detail.episodesList
                .slice(0)
                .reverse()
                .map((ep) => (
                  <Link
                    to={`/test/${ep.episodeId}`}
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
      <div className="footer">
        <div className="footer-content">
          <div className="footer-icons">
            <i class="fa-brands fa-telegram"></i>
            <i class="fa-brands fa-discord" onClick={() => openInNewTab("https://discord.gg/rap6A2TYds")}></i>
            <i class="fa-brands fa-github" onClick={() => openInNewTab("https://github.com/ShivaBhattacharjee/betaanime.git")}></i>
          </div>
          <h3>Anime <span>Trix</span></h3>
          <p>AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only an user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access . AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant</p>
        </div>
      </div>
    </>
  );
}
