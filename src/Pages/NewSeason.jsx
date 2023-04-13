import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const NewSeason = () => {
    const renderAfterCalled = useRef(false);
    const [season, setSeason] = useState([])
    const getSeason = async (id = 1) => {
        const api = await fetch(`https://api.consumet.org/meta/anilist/recent-episodes?page=${id}`)
        const response = await api.json()
        setSeason(response.results)
    }
    useEffect(() => {
        if (!renderAfterCalled.current) {
            getSeason()
        }
        renderAfterCalled.current = true;
    }, []);

    return (
        <section className="movies">
            <div className="filter-bar">
                <div className="heading">
                    <h3>Recent Episodes</h3>
                </div>
            </div>
            <div className="seasons-grid">
                {season.map((newSeason,newSeasonId) => {
                    return (
                        <>
                            <div className='season-card' key={newSeasonId.id}>

                                <div className="season-head">
                                    <div className="bookmark-icon">
                                       <h1>18+</h1>
                                    </div>
                                    <Link to={`/anime-details/${newSeason.id}`}>
                                        <img
                                            src={newSeason.image}
                                            alt="pta nhi bhai"
                                            className="season-img"
                                        />
                                    </Link>
                                    <div className="season-details">
                                        <div className="release-date-season">
                                            <span className='season-relase'>{newSeason.rating/10}</span>
                                        </div>
                                        <h5 className="season-title">{newSeason.title.userPreferred}</h5>

                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </section>
    )
}

export default NewSeason