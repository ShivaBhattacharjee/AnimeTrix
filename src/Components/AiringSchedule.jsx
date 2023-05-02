import React from "react";
import { Link } from "react-router-dom";
function AiringSchedule(props) {
  const { airingList, ref } = props;
  return (
    <div className="airing-schedule">
      <div className="airing-schedule-heading">
        <h3>Airing Schedule</h3>
      </div>

      <div className="anime-airing">
        {airingList?.map((airingSchedule) => {
          const { id, title, episode, airingAt } = airingSchedule;

          return (
            <div key={id} ref={ref} className="anime-schedule">
              <div className="first-info">
                <div className="schedule-info">
                  {new Date(airingAt * 1000).toLocaleString()}
                </div>
                <div>{title.userPreferred}</div>
              </div>
              <Link to={`/anime-details/${id}`}>
              <div className="schedule-info">Episode : {episode}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AiringSchedule;
