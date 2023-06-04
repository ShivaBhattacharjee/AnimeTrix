import React, { useState, useRef, useEffect } from "react";

import { Card, AiringSchedule, ForYou, Footer, UpcomingSeason } from "../Components"
import { Link } from "react-router-dom";
import { useFetchInitialData } from "../utils/hooks";
import { HomeApi } from "../Components/constants";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../css/slider.css";
import { Autoplay, Pagination, Mousewheel } from "swiper";
import HomePageLoader from "../Loading/HomePageLoader";
import { Helmet } from 'react-helmet';
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
    window.scrollTo(0, 0);
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
 <Helmet>
 <meta property="og:title" content="AnimeTrix"/>
    <meta property="og:description" content="AnimeTrix is a Free Anime streaming website which you can watch English Subbed and Dubbed Anime online without creating any Account"/>
    <meta property="og:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png"/>
    <meta property="og:url" content="https://animetrix.vercel.app/"/>
    <meta property="og:type" content="website"/>

    <meta name="twitter:card" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png"/>
    <meta name="twitter:title" content="Animetrix"/>
    <meta name="twitter:description" content="AnimeTrix is a Free Anime streaming website which you can watch English Subbed and Dubbed Anime online without creating any Account"/>
    <meta name="twitter:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png"/>
    
  <title>Watch Download Anime For Free On AnimeTrix</title>
 </Helmet>
      {Object.keys(props.recent).length === 0 ? (
        <HomePageLoader />
      ) : (
        <>
          <Swiper
          direction={"vertical"}
          slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Mousewheel, Pagination, Autoplay]}
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
