import React from 'react'
import Skeleton from 'react-loading-skeleton'

const DetailsLoader = () => {
    return (
        <>
            <div className="details">
                <div >
                    <div className="anime-details">

                        <div className="anime-img">
                            <Skeleton className='anime-image'/>
                        </div>

                        <div className="anime-info">
                            <p className="anime-title">Loading Please be patient</p>
                            <button className="watch-anime-btn">Loading..</button>
                            <div className="anime-storyline">
                                <div className="summary">Summary:-</div>
                                <p>Loading.... </p>
                            </div>

                        </div>
                    </div>

                    <div className="anime-trailer">
                        <div className="trailer">
                            <Skeleton />
                        </div>
                    </div>
                    <div className="recommended-anime">
                        <h1>Recommended Anime</h1>
                    </div>
                    <div className="recommended-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                            <>
                                <div
                                    className="movie-card" >
                                    <Skeleton className="card-img" />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetailsLoader