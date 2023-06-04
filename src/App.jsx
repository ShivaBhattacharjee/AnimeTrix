import "./css/Root.css"
import "./App.css";
import "./css/Header.css";
import "./css/Details.css";
import "./css/stream.css";
import "./css/Footer.css";
import './css/card.css';
import './css/error404.css';
import './css/titleandfilterbar.css';
import './css/slider.css';
import './css/topScroll.css'
import './css/Login.css'
import './css/lastwatch.css'
import './css/Search.css'
import './css/Chatbot.css'
import './css/AiringSchedule.css'
import './css/ForYou.css'
import "./css/ImageSearch.css"
import "./css/UpcomingSeason.css"
import './css/terms.css'
import { Error404, Header, ScrollToTop, SearchJSX, History, Bookmark } from "./Components/";
import { RecentAnime, Details, Stream, Popular, TopAnimeAiring, Movie, Genre, Login, Register, AIChat, Profile, ForgotPassword, AnimeImageSearch, NewSeason, Terms } from "./Pages"
import { ToastContainer } from 'react-toastify';


import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";


import { useEffect, useRef, useState } from "react";
import axios from "axios";


import { HomeApi } from "./Components/constants";
import { showErrorToast } from "./utils/toast";
function App() {
  const childRef = useRef();
  const [slider, setSlider] = useState([]);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movie, setMovie] = useState([]);
  const [newUpload, setNewUpload] = useState([]);
  // const [dub, setDub] = useState([]);
  const [topAiring, setTop] = useState([]);
  const [idx, setIdx] = useState(1);
  const [idxPropular, setidxPropular] = useState(1);
  // const [idxdub, setIdxdub] = useState(1);
  const [idxmovie, setIdxmovie] = useState(1);
  const [idxtop, setIdxtop] = useState(1);
  const [idxNewUpload, setIdxNewUpload] = useState(1);
  const renderAfterCalled = useRef(false);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Functions
  const getSlider = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `${HomeApi}/meta/anilist/trending?page=1`
      );
      setSlider((slider) => [...slider, ...Data.data.results]);
      setLoading(false);
    } catch (err) {
      showErrorToast("Error loading slider");
      setLoading(false);
    }
  };
  const getAnime = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `${HomeApi}/meta/anilist/recent-episodes?page=${id}&perPage=20`
      );
      setRecent((recent) => [...recent, ...Data.data.results]);
      setLoading(false);
    } catch (err) {
      showErrorToast('Error loading Recent Anime!');
      setLoading(false);
    }
  };
  const getPropular = async (id = 1) => {
    try {
      setLoading(true);
      const propu = await axios.get(
        `${HomeApi}/meta/anilist/popular?page=${id}`
      );
      setPopular((popular) => [...popular, ...propu.data.results]);
      setLoading(false);
    } catch (err) {
      showErrorToast('Error loading Popular Anime!');
      setLoading(false);
    }
  };
  // const getDub = async (id = 1) => {
  //   try {
  //     setLoading(true);
  //     const Data = await axios.get(
  //       `https://animetrix-api.onrender.com/recent-release?type=2&page=${id}`
  //     );
  //     setDub((dub) => [...dub, ...Data.data]);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("Error loading Dubbed Anime");
  //     setLoading(false);
  //   }
  // };
  const getMovie = async (id = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${HomeApi}/meta/anilist/advanced-search?format=MOVIE&page=${id}`
      );
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovie((movie) => [...movie, ...data.results]);
      } else {
        showErrorToast("Error loading Movies!");
        console.log("Error loading Movies!")
      }
      setLoading(false);
    } catch (err) {
      showErrorToast("Error loading Movies");
      setLoading(false);
    }
  };

  const getTopAiring = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(`${HomeApi}/meta/anilist/trending?page=${id}&perPage=20`
      );
      setTop((topAiring) => [...topAiring, ...Data.data.results]);
      setLoading(false);
    } catch (err) {
      showErrorToast("Error loading Top Airing!");
      setLoading(false);
    }
  };

  const getNewUpload = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(`${HomeApi}/meta/anilist/recent-episodes?page=${id}&perPage=20`);
      setNewUpload((newUpload) => [...newUpload, ...Data.data.results]);
      setLoading(false);
    } catch (err) {
      showErrorToast("Error loading Recent Upload!");
      setLoading(false);
    }
  };

  // Fetch function call
  useEffect(() => {
    if (!renderAfterCalled.current) {
      getAnime(1);
      getSlider();
      getPropular();
      // getDub();
      getMovie();
      getTopAiring();
      getNewUpload();
    }
    renderAfterCalled.current = true;
  }, []);

  // Search Bar function
  const handelChanges = async (val) => {
    try {
      setLoading(false)
      const searchRes = await axios
        .get(`${HomeApi}/meta/anilist/${val}`)
      if (val === "") {
        setSearchResult(null);
      } else {
        setSearchResult(searchRes.data);
      }
    }
    catch (err) {
      showErrorToast("Search Failed!");
      console.log("Search failed")
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

  // const loadMoreDub = () => {
  //   getDub(idxdub + 1);
  //   setIdxdub(idxdub + 1);
  // };

  const loadMoreMovies = () => {
    getMovie(idxmovie + 1);
    setIdxmovie(idxmovie + 1);
  };
  const loadMoreTopAnime = () => {
    getTopAiring(idxtop + 1);
    setIdxtop(idxtop + 1);
  }
  const loadmoreUpload = () => {
    getNewUpload(idxNewUpload + 1);
    setIdxNewUpload(idxNewUpload + 1);
  };

  return (
    <Router className="App">
      <ToastContainer />
      <ScrollToTop />
      <Header handelChanges={handelChanges} ref={childRef} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RecentAnime
              recent={recent}
              popular={popular}
              searchResult={searchResult}
              handelClick={handelClick}
              loadMoreRecent={loadMoreRecent}
              loading={loading}
              slider={slider}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <SearchJSX searchResult={searchResult} handelClick={handelClick} loading={loading}/>
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
        {/* <Route
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
        /> */}
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
          path="/recent-anime"
          element={
            <NewSeason
              recent={newUpload}
              searchResult={searchResult}
              handelClick={handelClick}
              loadmoreUpload={loadmoreUpload}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/genre"
          element={
            <Genre
            />
          }
        />
        <Route
          exact
          path="/ai-chat"
          element={
            <AIChat
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
          path="/watch/:episodeId/:animeId"
          element={<Stream />}
        />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/image-search" element={<AnimeImageSearch />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/bookmark" element={<Bookmark />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
console.log("Hentai onichan!! Why you looking at my source")
export default App;
