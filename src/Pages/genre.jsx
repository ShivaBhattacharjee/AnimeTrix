import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import spinner from "../img/spinner.svg";

function OptionFetcher() {
 
  const [selectedOption, setSelectedOption] = useState('action');

  const [data, setData] = useState(null);
  
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);


  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://gogoanime-api-dc2c.up.railway.app/genre/${selectedOption}?page=${page}`
      );
      const responseData = await response.json();

      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


  function handleChange(event) {

    setSelectedOption(event.target.value);
  }


  async function fetchMoreData() {
    try {
      setPage(page + 1);
      const response = await fetch(
        `https://gogoanime-api-dc2c.up.railway.app/genre/${selectedOption}?page=${page}`
      );
      const responseData = await response.json();
      setData([...data, ...responseData]);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    setPage(1);
  }, [selectedOption]);

  return (
    <>
          {isLoading && (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
      )}
      <section className='movies'>
        <div className="filter-bar genre">
          <div className="filter-dropdowns">
            <select value={selectedOption} onChange={handleChange}>
              <option value="action" defaultChecked>Action</option>
              <option value="adventure">Adventure</option>
              <option value="cars ">Cars </option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="dementia">Dementia</option>
              <option value="demons">Demons</option>
              <option value="drama">Drama</option>
              <option value="ecchi">Ecchi</option>
              <option value="family">Family</option>
              <option value="fantasy">Fantasy</option>
              <option value="game">Game</option>
              <option value="gourmet">Gourmet</option>
              <option value="harem">Harem</option>
              <option value="historical">Historical</option>
              <option value="horror">Horror</option>
              <option value="josei">Josei</option>
              <option value="kids">Kids</option>
              <option value="magic">Magic</option>
              <option value="mecha">Mecha</option>
              <option value="martial-arts">Martial-arts</option>
              <option value="military">Military</option>
              <option value="mystery">Mystery</option>
              <option value="parody">Parody</option>
              <option value="police">Police</option>
              <option value="psychological">Psychological</option>
              <option value="romance">Romance</option>
              <option value="samurai">Samurai</option>
              <option value="school">School</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="seinen">Seinen</option>
              <option value="shoujo">Shoujo</option>
              <option value="shounen">Shounen</option>
              <option value="space">Space</option>
              <option value="sports">Sports</option>
              <option value="super-power">Super-power</option>
              <option value="supernatural">Supernatural</option>
              <option value="suspense">Suspense</option>
              <option value="thriller">Thriller</option>
              <option value="vampire">Vampire</option>
              <option value="yaoi">Yaoi</option>
              <option value="yuri">Yuri</option>
            </select>
          </div>
          <div className="heading">
            <h2>Sort By Genre</h2>
          </div>
        </div>
        {data && (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<img src={spinner} alt="spinner" className="spinner" />}
          >
            <div className='movies-grid'>
              {data.map(item => (
                <div
                  className="movie-card" key={item.animeId}>
                  <Link to={`/anime-details/${item.animeId}`}>
                    <div className="card-head">
                      <img
                        src={item.animeImg}
                        alt={item.animeId}
                        className="card-img"
                      />
                      <div className="">
                        <h5 className="card-title">{(item.animeTitle.substring(0,35))}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
}


export default OptionFetcher;
