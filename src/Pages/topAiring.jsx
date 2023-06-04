import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/spinner.svg";
import Card from "../Components/Card";
import OtherPagesCard from "../Loading/OtherPagesCard";
import { useFetchInitialData } from "../utils/hooks";
import { Helmet } from 'react-helmet';
const TopAnimeAiring = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreTopAnime();
  };

  const { loading, topanime, loadMoreTopAnime } = props;

  useFetchInitialData(loading, topanime, loadMoreTopAnime, ref, window)

  return (
    <>
      <Helmet>
        <meta property="og:title" content="AnimeTrix" />
        <meta property="og:description" content="AnimeTrix is a Free Anime streaming website which you can watch English Subbed and Dubbed Anime online without creating any Account" />
        <meta property="og:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />
        <meta property="og:url" content="https://animetrix.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />
        <meta name="twitter:title" content="Animetrix" />
        <meta name="twitter:description" content="AnimeTrix is a Free Anime streaming website which you can watch English Subbed and Dubbed Anime online without creating any Account" />
        <meta name="twitter:image" content="https://user-images.githubusercontent.com/95211406/234815538-17642467-574a-42ec-96d1-75c2a67bebd3.png" />

        <title>Watch Download Anime For Free On AnimeTrix</title>
      </Helmet>
      {Object.keys(props.recent).length === 0 ? (
        <OtherPagesCard title="Trending" />
      ) : (
        <>
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Trending</h3>
              </div>
            </div>

            <div className="movies-grid" ref={ref}>
              {props.recent.map((rec) => (
                <Card
                  rec={rec}
                  key={rec.animeId} handelClick={handelClick}
                  ep="false" />
              ))}
            </div>
            <InfiniteScroll
              dataLength={props.recent.length}
              next={loadMore}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
            ></InfiniteScroll>
          </section>
        </>
      )}
    </>
  );
};

export default TopAnimeAiring;
