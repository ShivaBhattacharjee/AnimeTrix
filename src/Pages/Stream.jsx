import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Footer from "../Components/Footer";
import axios from "axios";
export default function Stream() {
  const { episodeId } = useParams()
  const [data, setData] = useState([]);
  const { animeId } = useParams()
  const [loading, setLoading] = useState(true)
  const [stream, setstream] = useState([])
  const [detail, setDetail] = useState({});
  const [extraDetail, setextraDetail] = useState([]);
  const getStream = async () => {
    try {
      const Video = await axios.get(
        `https://animetrix-api.onrender.com/vidcdn/watch/${episodeId}`
      );
      setData(Video.data.Referer);
      setLoading(false);
    }
    catch (err) {
      console.log("Error loading streaming data")
    }
  }

  const getDetails = async () => {
    try {
      const api = await fetch(`https://api.consumet.org/meta/anilist/info/${animeId}`)
      const response = await api.json()
      setDetail(response);
      const responseArray = [response];
      setextraDetail(responseArray)
    }
    catch (err) {
      console.log("Error loading details")
    }
  }

  useEffect(() => {
    getStream()
    getDetails()
  }, [episodeId,animeId]);
  return (
    <>
      <LoadingBar
        color='#0000FF'
        progress={100}
        height={5}
        shadow='true'
      />
      {loading ? (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>

      ) : (
        <>
          <div className="stream" key={episodeId}>
            <div className="stream-container">
              <div className="video-title">
                <span>{detail.title.romaji}</span>
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
                    title={episodeId}
                  />
                </div>
                
                {/* Episode List */}
                <div className="list-box">
                  <div className="episode-list">
                    {detail.episodes.map((ep) => (
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
            {extraDetail.map((extra) => {
              return (
                <>
                  <div className="airing-extra-info">
                    {extra.nextAiringEpisode == undefined ? (
                      <h1></h1>
                    ) : (
                      <h1>Episode {extra.nextAiringEpisode.episode} will air at {new Date(extra.nextAiringEpisode.airingTime * 1000).toLocaleString()}</h1>
                    )}
                  </div>
                  <div className="characters-container">
                    <div className="character-heading">
                      <h1>Characters</h1>
                    </div>
                    {extra.characters.map((chDetails) => {
                      return (
                        <div>
                          <img src={chDetails.image} alt="" />
                          <h1>{chDetails.name.full}</h1>
                        </div>
                      )
                    })}
                  </div>
                </>
              )
            })}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}