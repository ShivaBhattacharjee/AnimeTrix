import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"
// import "swiper/css/navigation";

import "../css/slider.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slider() {
  const renderAfterCalled = useRef(false);
  const [sliderinfo, setSlider] = useState([]);
  const getSlider = async () => {
    const api = await fetch("https://animetrix-api.onrender.com/top-airing?page=1");
    setSlider(await api.json());
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
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >{
          sliderinfo.map((data, uqley , swipe) => {
            return (
              <div className="banner-card" key={uqley}>
                <SwiperSlide key={swipe.animeId}>
                  <img src={data.animeImg} alt={data.animeId} className="blur" />
                  <div className="banner-text">
                    <Link to={`/anime-details/${data.animeId}`}>
                      <h4>{data.animeTitle.substring(0,25)}....</h4>

                      <button className="watch">Watch Now</button>
                    </Link>
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
