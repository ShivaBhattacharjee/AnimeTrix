import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
const UpcomingSeasonCard = ({fallData}) => {
  return (
    <div className="content">
    <Link to={`/anime-details/${fallData?.id}`}>
        <LazyLoadImage src={fallData?.image} alt="img" />
    </Link>
    <div className="text">
        <h4>{fallData?.title?.userPreferred}</h4>
        <div className="details-seasons">
            <span>{fallData.type}</span>
            <span>{fallData.countryOfOrigin}</span>
        </div>
        <span>{fallData?.releaseDate}</span>
        <div className="genre-upcoming">
            {fallData?.genres?.map((genrData) => (
                <small>{genrData} </small>
            ))}
        </div>
    </div>
</div>
  )
}

export default UpcomingSeasonCard