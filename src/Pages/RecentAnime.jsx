import React, { useState, useRef, useEffect } from "react";

import { Card,  AiringSchedule, ForYou, Footer, UpcomingSeason } from "../Components"
import { Link } from "react-router-dom";
import { useFetchInitialData } from "../utils/hooks";
import { HomeApi } from "../Components/constants";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"

import "../css/slider.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import HomePageLoader from "../Loading/HomePageLoader";
// import History from "../Components/History";
const RecentAnime = (props) => {
  const renderAfterCalled = useRef(false);
  const [airingList, setairingList] = useState([])
  const getAiring = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/airing-schedule?notYetAired=true`)
      const response = await api.json()
      setairingList(response.results)
    }
    catch (error) {
      console.log("Error loading top airing list")
    }
  }



  useEffect(() => {
    if (!renderAfterCalled.current) {
      getAiring()
    }
    renderAfterCalled.current = true;
  }, []);
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  const { loading, recent, loadMoreRecent, slider } = props;

  useFetchInitialData(loading, recent, loadMoreRecent, ref, window, slider)

  return (
    <>
      {Object.keys(props.recent).length === 0 ? (
        <HomePageLoader/>
      ) : (
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
          >
            {props.slider &&
              props.slider.map((rec) => (
                <div className="banner-card" key={rec.id}>
                  <SwiperSlide >
                    <img src={rec?.cover} loading="lazy" alt={rec.id} />
                    <div className="banner-text">
                      <Link to={`/anime-details/${rec.id}`}>
                        <h4>{rec.title.english}</h4>

                        <button className="watch">Watch Now</button>
                      </Link>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
          {/* <History/> */}
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Recent Anime</h3>
              </div>
            </div>
            <div className="movies-grid">
              {props.recent &&
                props.recent.map((rec) => (
                  <Card rec={rec} key={rec.id} handelClick={handelClick} />
                ))}
            </div>
            <div className="loadmore-recent">
              <Link to="/recent-anime" onClick={scroll}>
                <button className="loadmore">View More</button>
              </Link>
            </div>
          </section>
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Popular</h3>
              </div>
            </div>
            <div className="movies-grid">
              {props.popular.map((rec) => (
                <Card
                  rec={rec}
                  key={rec.id} handelClick={handelClick}
                />
              ))}
            </div>
            <div className="loadmore-recent">
              <Link to="/popular" onClick={scroll}>
                <button className="loadmore">View More</button>
              </Link>
            </div>
          </section>
          <ForYou />
          <br /><br />
          <UpcomingSeason />
          <br /><br />
          <AiringSchedule airingList={airingList} ref={ref} />
          <Footer />
        </>
      )}
    </>
  );
};
export default RecentAnime;
