import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/spinner.svg";
import Card from "../Components/Card";
import { Helmet } from 'react-helmet';
import { useFetchInitialData } from "../utils/hooks";
import OtherPagesCard from "../Loading/OtherPagesCard";
const Movie = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreMovies();
  };

  const { loading, movie, loadMoreMovies } = props;

  useFetchInitialData(loading, movie, loadMoreMovies, ref, window)
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
        <OtherPagesCard title="Movies" />
      ) : (
        <>
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Movies</h3>
              </div>
            </div>
            <div className="movies-grid" ref={ref}>
              {props.recent.map((rec) => (
                <Card rec={rec} key={rec.id} handelClick={handelClick} />
              ))}
            </div>
            <InfiniteScroll
              dataLength={props.recent.length}
              next={loadMore}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
              endMessage={
                <h3 style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </h3>
              }
            ></InfiniteScroll>
          </section>
        </>
      )}
    </>
  );
};

export default Movie;
