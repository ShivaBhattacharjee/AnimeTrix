import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import spinner from "../img/spinner.svg";
import { Card } from '../Components';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeApi } from '../Components/constants';
import GenreLoading from '../Loading/GenreLoading';
import { showErrorToast } from '../utils/toast';
function Genre() {

  const [selectedOption, setSelectedOption] = useState('Action');

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  //bookmark


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
        `${HomeApi}/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page}`
      );
      const responseData = await response.json();
      console.log(responseData)
      setData([...data, ...responseData.results]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showErrorToast('Error loading genre');

    }
  }


  function handleChange(event) {

    setSelectedOption(event.target.value);
    setPage(1);
    setData([]);
  }


  async function fetchMoreData() {
    try {
      setPage(page => page + 1);
      const response = await fetch(
        `${HomeApi}/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page + 1}`
      );
      const responseData = await response.json();
      setData([...data, ...responseData.results]);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    setPage(1);
  }, [selectedOption]);


  return (
    <>
      <ToastContainer />
      {data && (
        <section className='movies'>
          <div className="filter-bar genre">
            <div className="filter-dropdowns">
              <select value={selectedOption} onChange={handleChange}>
                {["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Mystery", "Romance", "Sci-Fi", "Sports", "Supernatural", "Thriller"].map((genreItem) => {
                  return (
                    <option value={genreItem} key={genreItem} >{genreItem}</option>
                  )
                })}
              </select>
            </div>
            <div className="heading">
              <h2>Sort By Genre</h2>
            </div>
          </div>
          {isLoading ? (
      <GenreLoading/>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
            >
              <div className='movies-grid'>
                {data.map(rec => (
                  <Card rec={rec} key={rec.id} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </section>
      )}
    </>
  );
}


export default Genre;
