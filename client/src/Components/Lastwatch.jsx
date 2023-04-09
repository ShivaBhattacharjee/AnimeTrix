import React from "react";
import { Link } from "react-router-dom";
import { useState} from "react";

const Lastwatch = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [lastwatch] = useState(null);

  const LOCAL_STORAGE_KEY = "animetrix-vercel-app"
  
  const handleCloseLastwatch = () => {
    setIsActive(current => !current);
    localStorage.removeItem(LOCAL_STORAGE_KEY, JSON.stringify(lastwatch));
  }

  return (
    <>
      {props.lastwatch !== null ?
        <div className={`lastwatch ${isActive ? "active" : ""}`}>
          <section className="movies">
            <div className="lastwatch-bar">
              <div className="lastwatch-heading">
                <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                <div className="lastwatch-card">
                  <div className="lastwatch-close">
                    {
                      isActive === true ?
                        <i
                          className="fa-solid fa-xmark"
                          onClick={handleCloseLastwatch}
                        /> : null
                    }
                  </div>
                  <div className="lastwatch-head">
                    <Link
                      to={props.lastwatch.url}
                      state={{ animeID: `${props.lastwatch.animeId}` }}
                    >
                      <img src={props.lastwatch?.coverimg} alt={props.lastwatch?.animeId} className="lastwatch-img" />
                    </Link>
                    <div className="lastwatch-details">
                      <h5 className="lastwatch-title">
                        {props.lastwatch?.title}
                        <br />
                        <span className="last-ep">Episode:- {props.lastwatch?.ep}</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div> : null
      }
    </>
  );
};

export default Lastwatch;
