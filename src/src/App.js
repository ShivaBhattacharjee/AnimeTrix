import "./App.css";
import "./css/navbar.css";
import "./css/Details.css";
import "./css/stream.css";
import "./css/Footer.css";
import "./css/lastwatch.css";
import './css/card.css';
import './css/error404.css';
import './css/titleandfilterbar.css';
import './css/slider.css';
import './css/loading.css';
import './css/topScroll.css'

import {Error404,Header,ScrollToTop,SearchJSX,} from "./Components/";
import{DubAnime,RecentAnime,Details,Stream,Popular,TopAnimeAiring,Movie,OptionFetcher} from"./Pages"



import {
  BrowserRouter as Router,Routes,Route,} from "react-router-dom";


import { useEffect, useRef, useState } from "react";
import axios from "axios";



function App() {
  const childRef = useRef();
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movie, setMovie] = useState([]);
  const [dub, setDub] = useState([]);
  const [topAiring, setTop] = useState([]);
  const [idx, setIdx] = useState(1);
  const [idxPropular, setidxPropular] = useState(1);
  const [idxdub, setIdxdub] = useState(1);
  const [idxmovie, setIdxmovie] = useState(1);
  const [idxtop, setIdxtop] = useState(1);
  const renderAfterCalled = useRef(false);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Functions
  const getAnime = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `https://gogoanime-api-dc2c.up.railway.app/recent-release?page=${id}`
      );
      setRecent((recent) => [...recent, ...Data.data]);
      setLoading(false);
    } catch (err) {
      console.log("error loading anime");
      setLoading(false);
    }
  };
  const getPropular = async (id = 1) => {
    try {
      setLoading(true);
      const propu = await axios.get(
        `https://gogoanime-api-dc2c.up.railway.app/popular?page=${id}`
      );
      setPopular((popular) => [...popular, ...propu.data]);
      setLoading(false);
    } catch (err) {
      console.log("Error loading Popular Anime");
      setLoading(false);
    }
  };
  const getDub = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `https://gogoanime-api-dc2c.up.railway.app/recent-release?type=2&page=${id}`
      );
      setDub((dub) => [...dub, ...Data.data]);
      setLoading(false);
    } catch (err) {
      console.log("Error loading Dubbed Anime");
      setLoading(false);
    }
  };
  const getMovie = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `https://gogoanime-api-dc2c.up.railway.app/anime-movies?page=${id}`
      );
      setMovie((movie) => [...movie, ...Data.data]);
      setLoading(false);
    } catch (err) {
      console.log("Error loading Movies");
      setLoading(false);
    }
  };
  const getTopAiring = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(`https://gogoanime-api-dc2c.up.railway.app/top-airing?page=${id}`
      );
      setTop((topAiring) => [...topAiring, ...Data.data]);
      setLoading(false);
    } catch (err) {
      console.log("Error loading top-airing");
      setLoading(false);
    }
  };
  // Fetch function call
  useEffect(() => {
    if (!renderAfterCalled.current) {
      getAnime(1);
      getPropular();
      getDub();
      getMovie();
      getTopAiring();
    }
    renderAfterCalled.current = true;
  }, []);

  // Search Bar function
  const handelChanges = async (val) => {
    const searchRes = await axios
      .get(`https://gogoanime-api-dc2c.up.railway.app/search?keyw=${val}`)
      .catch((err) => "search Error");
    if (val === "") {
      setSearchResult(null);
    } else {
      setSearchResult(searchRes.data);
    }
  };

  // Handle click
  const handelClick = () => {
    setSearchResult(null);
    childRef.current.emptySearch();
  };

  // load more functions

  const loadMoreRecent = () => {
    getAnime(idx + 1);
    setIdx(idx + 1);
  };

  const loadMorePopular = () => {
    getPropular(idxPropular + 1);
    setidxPropular(idxPropular + 1);
  };

  const loadMoreDub = () => {
    getDub(idxdub + 1);
    setIdxdub(idxdub + 1);
  };
  const loadMoreMovies = () => {
    getMovie(idxmovie + 1);
    setIdxmovie(idxmovie + 1);
  };
  const loadMoreTopAnime = () => {
    getTopAiring(idxtop + 1);
    setIdxtop(idxtop + 1);
  }

  return (
    <Router className="App">
      <ScrollToTop/>
      <Header handelChanges={handelChanges} ref={childRef} />
      {searchResult ? (
        <SearchJSX searchResult={searchResult} handelClick={handelClick} />
      ) : null}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RecentAnime
              recent={recent}
              searchResult={searchResult}
              handelClick={handelClick}
              loadMoreRecent={loadMoreRecent}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/popular"
          element={
            <Popular
              popular={popular}
              handelClick={handelClick}
              loadMorePopular={loadMorePopular}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/dub-anime"
          element={
            <DubAnime
              recent={dub}
              searchResult={searchResult}
              handelClick={handelClick}
              loadMoreDub={loadMoreDub}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/top-airing"
          element={
            <TopAnimeAiring
              recent={topAiring}
              searchResult={searchResult}
              handelClick={handelClick}
              loadMoreTopAnime={loadMoreTopAnime}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/movie"
          element={
            <Movie
              recent={movie}
              searchResult={searchResult}
              handelClick={handelClick}
              loadMoreMovies={loadMoreMovies}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/genre"
          element={
            <OptionFetcher
            />
          }
        />
        <Route

          exact
          path="/anime-details/:animeId"
          element={<Details handelClick={handelClick} />}
        />
        <Route
          exact
          path="/vidcdn/watch/:episodeId"
          element={<Stream />}
        />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
