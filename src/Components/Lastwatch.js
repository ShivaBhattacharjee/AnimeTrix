import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Lastwatch = (props) => {
  const [isActivelw, setIsActivelw] = useState(true);
  const handleCloseLastwatch = () => {
    setIsActivelw(current => !current);
    if (isActivelw === true)
      document.getElementsByClassName("lastwatch")[0].style.width = "10px"
    else
      document.getElementsByClassName("lastwatch")[0].style.width = "100%"
  }

  return (<>
    {props.lastwatch !== null ?
      <div className="lastwatch active" >
        <div className={isActivelw ? "" : 'deactiveLw'}>
          <br />
          <p className="my-1" style={{ fontSize: "15px" }}>
            <i>Continue From Where Left Of</i> 
          </p>
          <h3 className="heading">Last Watched</h3>
          <Link
            to={props.lastwatch.url}
            state={{ animeID: `${props.lastwatch.animeId}` }}
          >
            <div className="play">
              <ion-icon name="play-circle-outline"></ion-icon>
            </div>
            <div
              className="d-flex row"
              style={{
                alignItem: "center",
              }}
            >
              <p className="d-flex" style={{ fontSize: "auto",fontWeight:"500",padding:"4px 0 0 0" }}>
                <i className="bi bi-caret-right-square-fill me-2" />
                <span>
                  {props.lastwatch?.title} 
                </span>
              </p>
            </div>

          </Link>
        </div>
        <div className="switchLw d-flex">
          {
            isActivelw === true ?
              <i
                className="bi bi-x-lg lastwatchClose"
                onClick={handleCloseLastwatch}
              /> : <i className="bi bi-caret-right-fill lastwatchOpen" onClick={handleCloseLastwatch} />
          }
        </div>

      </div> : null
    }
  </>
  );
};

export default Lastwatch;
