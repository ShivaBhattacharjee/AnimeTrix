import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"

import "../css/slider.css";
import Skeleton from 'react-loading-skeleton';
import { Footer } from '../Components';

const HomePageLoader = () => {
    return (
        <>
            <Swiper
            >
                <div className="banner-card">
                    <SwiperSlide>
                        <Skeleton style={{ width: '100%', height: '100%' }} />
                    </SwiperSlide>
                </div>
            </Swiper>
            <section className="movies">
                <div className="filter-bar">
                    <div className="heading">
                        <h3>Recent Anime</h3>
                    </div>
                </div>
                <div className="movies-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(() => {
                        return (
                            <div
                                className="movie-card" >
                                <Skeleton className="card-img" />
                            </div>
                        )
                    })}
                </div>
                <div className="loadmore-recent">
                </div>
            </section>

            <section className="movies">
                <div className="filter-bar">
                    <div className="heading">
                        <h3>Popular</h3>
                    </div>
                </div>
                <div className="movies-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(() => {
                        return (
                            <div
                                className="movie-card" >
                                <Skeleton className="card-img" />
                            </div>
                        )
                    })}
                </div>
            </section>
            <br /><br /><br />
            <Footer />
        </>

    )
}

export default HomePageLoader