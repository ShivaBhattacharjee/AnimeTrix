import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Card } from '../Components';

const NewSeason = (props) => {
    const renderAfterCalled = useRef(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [season, setSeason] = useState([])
    const getSeason = async (id = 1) => {
        const api = await fetch(`https://api.consumet.org/meta/anilist/recent-episodes?page=${id}`)
        const response = await api.json()
        setSeason(response.results)
    }
    //bookmark
    function handleIconClick() {
     setIsBookmark(!isBookmark);
  }
    useEffect(() => {
        if (!renderAfterCalled.current) {
            getSeason()
        }
        renderAfterCalled.current = true;
    }, []);

    return (
        <section className="movies" onClick={() => props.handelClick()}>
            <div className="filter-bar">
                <div className="heading">
                    <h3>Recent Episodes</h3>
                </div>
            </div>
            <div className="seasons-grid">
                {season.map((rec) => {
                    return (
                        <>
                            <Card rec={rec} key={rec.id}/>
                        </>
                    )
                })}
            </div>
        </section>
    )
}

export default NewSeason