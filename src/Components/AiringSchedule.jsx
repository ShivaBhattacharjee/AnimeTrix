import React from "react";

function AiringSchedule(props) {
  const { airingList, ref } = props;
  return (
    <div className="airing-schedule">
      <div className="airing-schedule-heading">
        <h2>Airing Schedule</h2>
      </div>

      <div className="anime-airing">
        {airingList.map((airingSchedule) => {
          const { id, title, episode, airingAt } = airingSchedule;

          return (
            <div key={id} ref={ref} className="anime-schedule">
              <div className="first-info">
                <div className="schedule-info">
                  {new Date(airingAt * 1000).toLocaleString()}
                </div>
                <div>{title.userPreferred}</div>
              </div>
              <div className="schedule-info">Episode : {episode}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AiringSchedule;
