import React from 'react'
import Skeleton from 'react-loading-skeleton'

const DetailsLoader = () => {
    return (
        <>
            <div className="details">
                <div >
                    <div className="anime-details">

                        <div className="anime-img">
                            <Skeleton className='anime-image' />
                        </div>

                        <div className="anime-info">
                            <p className="anime-title"><Skeleton /></p>
                            <Skeleton className='anime-storyline' style={{height:"100%", minWidth:"300px"}} />

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
                    <div className="movies-grid">
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