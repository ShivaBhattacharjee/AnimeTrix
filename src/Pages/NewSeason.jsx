import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

const NewSeason = () => {
    const [season, setSeason] = useState([])
    const getSeason = async (id = 1) => {
        const api = await fetch(`https://gogoanime-api-dc2c.up.railway.app/new-season?page=${id}`)
        setSeason(await api.json())
    }
    useEffect(() => {
        getSeason()
    }, []);

    return (
        <section className="movies">
            <div className="filter-bar">
                <div className="heading">
                    <h3>New Seasons</h3>
                </div>
            </div>
            <div className="seasons-grid">
                {season.map((newSeason, newSeasonId) => {
                    return (
                        <>
                            <div className='season-card' key={newSeasonId.animeId}>
                                <Link to={`/anime-details/${newSeason.animeId}`}>
                                    <div className="season-head">
                                        <img
                                            src={newSeason.animeImg}
                                            alt={newSeason.animeId}
                                            className="season-img"
                                        />
                                        <div className="season-details">
                                            <h5 className="season-title">{(newSeason.animeTitle)}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )
                })}
            </div>
        </section>
    )
}

export default NewSeason