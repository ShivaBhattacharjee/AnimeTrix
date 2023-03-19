import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Lastwatch = (props) => {
  const [isActive, setIsActive] = useState(true);
  const handleCloseLastwatch = () => {
    setIsActive(current => !current);
    if (isActive === true)
      document.getElementsByClassName("lastwatch")[0].style.width = "10px"
    else
      document.getElementsByClassName("lastwatch")[0].style.width = "100%"
  }

  return (
  <>
    {props.lastwatch !== null ?
      <div className={`lastwatch ${isActive? "active": ""}`}>
          <p>Welcome Back</p>
          <h3 className="heading">Last Watched</h3>
          <Link
            to={props.lastwatch.url}
            state={{ animeID: `${props.lastwatch.animeId}` }}
          >
            <div className="play">
              <ion-icon name="play-circle-outline"></ion-icon>
            </div>
            <div>
                <span>
                  {props.lastwatch?.title} 
                </span>
            </div>

          </Link>
        <div className="lastwatch-close">
          {
            isActive === true ?
              <i
              className="fa-solid fa-x"
                onClick={handleCloseLastwatch}
              /> : <i className="fa-solid fa-house" onClick={handleCloseLastwatch} />
          }
        </div>

      </div> : null
    }
  </>
  );
};

export default Lastwatch;
