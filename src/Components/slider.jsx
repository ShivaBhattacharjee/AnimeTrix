import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {HomeApi} from "./constants"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"

import "../css/slider.css";

// import required modules
import { Autoplay, Pagination, Mousewheel } from "swiper";

export default function Slider() {
  const renderAfterCalled = useRef(false);
  const [sliderinfo, setSlider] = useState([]);
  const getSlider = async () => {
    const api = await fetch(`${HomeApi}/meta/anilist/trending?page=1`);
    const response = await api.json();
    setSlider(response.results);
  }
  useEffect(() => {
    if (!renderAfterCalled.current) {
      getSlider();
    }
    renderAfterCalled.current = true;
  }, []);
  return (
    <>
    <Swiper
    direction={"vertical"}
    slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >{
        sliderinfo.map((data, uqley , swipe) => {
          return (
            <div className="banner-card" key={uqley}>
              <SwiperSlide key={swipe.id}>
                <div className="banner-data">
                <img src={data.cover} alt={data.title.english} />
                <div className="banner-text">
                  <Link to={`/anime-details/${data.id}`}>
                    <h4>{data.title.english}</h4>

                    <button className="watch">Watch Now</button>
                  </Link>
                </div>
                </div>
              </SwiperSlide>
            </div>
          )
        })
      }
    </Swiper>
  </>
  );
}