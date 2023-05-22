import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { HomeApi } from './constants';
import { useFetchInitialData } from "../utils/hooks";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UpcomingSeasonCard from './UpcomingSeasonCard';
const UpcomingSeason = () => {
    const [summer, setSummer] = useState([])
    const [fall, setFall] = useState([]);
    const [spring, setSpring] = useState([])
    const [winter, setWinter] = useState([])
    const getSummer = async () => {
        const api = await fetch(`${HomeApi}/meta/anilist/advanced-search?season=SUMMER&&year=2023`, { timeout: 10000 });
        const response = await api.json();
        setSummer(response.results);
    }
    const getFall = async () => {
        const api = await fetch(`${HomeApi}/meta/anilist/advanced-search?season=FALL&&year=2023`, { timeout: 10000 });
        const response = await api.json();
        setFall(response.results);
    }
    const getSpring = async () => {
        const api = await fetch(`${HomeApi}/meta/anilist/advanced-search?season=SPRING&&year=2023`, { timeout: 1000 });
        const response = await api.json();
        setSpring(response.results);
    }
    const getWinter = async () => {
        const api = await fetch(`${HomeApi}/meta/anilist/advanced-search?season=WINTER&&year=2023`, { timeout: 1000 });
        const response = await api.json();
        setWinter(response.results);
    }
    useEffect(() => {
        getSummer();
        getSpring();
        getFall();
        getWinter();
    }, []);

    useFetchInitialData(summer, winter, fall, spring)
    return (
        <div className='upcoming-season'>
            <div className="airing-schedule-heading">
                <h3>Upcoming Season</h3>
            </div>
            <div className="seasons">

                <div className="season-box">

                    <h2>Fall</h2>
                    {fall?.map((fallData) => {
                        return (
                            <>
                                <UpcomingSeasonCard
                                    fallData={fallData}
                                />
                            </>
                        )
                    })}


                </div>
                <div className="season-box">

                    <h2>Summer</h2>
                    {summer?.map((fallData) => {
                        return (
                            <>
                                <UpcomingSeasonCard
                                    fallData={fallData} />
                            </>
                        )
                    })}


                </div>

                <div className="season-box">
                    <h2>Winter</h2>
                    {winter?.map((fallData) => {
                        return (
                            <>
                                <UpcomingSeasonCard
                                    fallData={fallData}
                                />
                            </>
                        )
                    })}


                </div>

                <div className="season-box">
                    <h2>Spring</h2>
                    {spring?.map((fallData) => {
                        return (
                            <>
              <UpcomingSeasonCard fallData={fallData}/>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UpcomingSeason