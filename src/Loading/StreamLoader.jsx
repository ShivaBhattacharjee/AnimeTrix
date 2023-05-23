import Skeleton from 'react-loading-skeleton'
import React from 'react'

const StreamLoader = () => {
    return (
        <>
            <div className="stream">
                <div className="stream-container">
                    <div className="video-title">
                        <span><Skeleton /></span>
                        <p>
                        Note :- Refresh the page if player doesnt load or change to nspl player.
                  <br />
                 To play the dubbed version, change the episode to the next available dub episode.
                        </p>
                    </div>
                    <br />
                    <div className="video-player-list">
                        {/* Video Player */}
                        <div className="video-player">
                                <Skeleton className='skeleton-loader-video'/>
                        </div>

                        {/* Episode List */}
                        <div className="list-box">
                            <div className="episode-list">
                                {[1,2,3,4,5,6,7,8,9,10].map(()=>{
                                    return(
                                        <Skeleton className='episode-skeleton' />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <div className="characters-container">
                        <div className="characters-heading">
                            <h2>Characters</h2>
                        </div>
                        <div className="characters">
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                    return <div className="character">
                                        <Skeleton className='skeleton-character'/>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default StreamLoader