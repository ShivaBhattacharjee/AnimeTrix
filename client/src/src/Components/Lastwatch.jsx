import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Lastwatch = (props) => {
  const [isActive, setIsActive] = useState(true);
  const handleCloseLastwatch = () => {
    setIsActive(current => !current);
  
  }

  return (
  <>
    {props.lastwatch !== null ?
      <div className={`lastwatch ${isActive? "active": ""}`}>
        <span className="welcome">Welcome Back</span>
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
              className="fa-solid fa-xmark"
                onClick={handleCloseLastwatch}
              /> : null
          }
        </div>

      </div> : null
    }
  </>
  );
};

export default Lastwatch;
