import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const UpcomingSeason = () => {
    const [fall, setFall] = useState([]);
    const [spring, setSpring] = useState([])
    const [winter, setWinter] = useState([])
    const getFall = async () => {
        const api = await fetch("https://animetrix-api.vercel.app/meta/anilist/advanced-search?season=FALL&&year=2023", { timeout: 10000 });
        const response = await api.json();
        console.log(response)
        setFall(response.results);
    }
    const getSpring = async () => {
        const api = await fetch("https://animetrix-api.vercel.app/meta/anilist/advanced-search?season=SPRING&&year=2023",{timeout: 1000});
        const response = await api.json();
        console.log(response)
        setSpring(response.results);
    }
    const getWinter = async () => {
        const api = await fetch("https://animetrix-api.vercel.app/meta/anilist/advanced-search?season=WINTER&&year=2023",{timeout:1000});
        const response = await api.json();
        console.log(response)
        setWinter(response.results);
    }
    useEffect(() => {
        getSpring();
        getFall();
        getWinter();
    }, []);
    return (
        <div className='upcoming-season'>
            <div className="airing-schedule-heading">
                <h3>Upcoming Season</h3>
            </div>
            <div className="seasons">
                <div className="season-box">
                    <h2>Spring</h2>
                    {spring?.map((sprinData) => {
                        return (
                            <>
                                <div className="content">
                                    <Link to={`/anime-details/${sprinData.id}`}>
                                    <img src={sprinData.image} alt="img" />
                                    </Link>
                                    <div className="text">
                                        <h4>{sprinData?.title?.userPreferred}</h4>
                                        <div className="details-seasons">
                                        <span>{sprinData.type}</span>
                                        <span>{sprinData.countryOfOrigin}</span>
                                        </div>
                                        <span>{sprinData?.releaseDate}</span>
                                        <div className="genre-upcoming">
                                            {sprinData?.genres?.map((genrData) => (
                                                <small>{genrData} </small>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

                <div className="season-box">

                    <h2>Fall</h2>
                    {fall?.map((fallData) => {
                        return (
                            <>
                                <div className="content">
                                    <Link to={`/anime-details/${fallData?.id}`}>
                                    <img src={fallData?.image} alt="img" />
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
                            </>
                        )
                    })}


                </div>


                <div className="season-box">
                    <h2>Winter</h2>
                    {winter?.map((winterData) => {
                        return (
                            <>
                                <div className="content">
                                    <Link to={`/anime-details/${winterData.id}`}>
                                    <img src={winterData.image} alt="img" />
                                    </Link>
                                    <div className="text">
                                        <h4>{winterData?.title?.userPreferred}</h4>
                                        <div className="details-seasons">
                                        <span>{winterData.type}</span>
                                        <span>{winterData.countryOfOrigin}</span>
                                        </div>
                                        <span>{winterData?.releaseDate}</span>
                                        <div className="genre-upcoming">
                                            {winterData?.genres?.map((winterData) => (
                                                <small>{winterData} </small>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}


                </div>
            </div>
        </div>
    )
}

export default UpcomingSeason