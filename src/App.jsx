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
import './css/NewSeason.css'
import './css/Login.css'
import './css/Register.css'
import './css/Search.css'
import './css/Chatbot.css'
import './css/AiringSchedule.css'
import './css/ForYou.css'
import "./css/ImageSearch.css"
import "./css/UpcomingSeason.css"

import { Error404, Header, ScrollToTop, SearchJSX, History, Bookmark } from "./Components/";
import { DubAnime, RecentAnime, Details, Stream, Popular, TopAnimeAiring, Movie, OptionFetcher, Login, Register, AIChat, Profile, ForgotPassword, AnimeImageSearch } from "./Pages"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";


import { useEffect, useRef, useState } from "react";
import axios from "axios";


import { HomeApi } from "./Components/constants";

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
        `${HomeApi}/meta/anilist/popular?page=${id}&perPage=20`
      );
      setRecent((recent) => [...recent, ...Data.data.results]);
      setLoading(false);
    } catch (err) {
      toast.error("Error loading anime", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
      setLoading(false);
    }
  };
  const getPropular = async (id = 1) => {
    try {
      setLoading(true);
      const propu = await axios.get(
        `${HomeApi}/meta/anilist/popular`
      );
      setPopular((popular) => [...popular, ...propu.data.results]);
      setLoading(false);
    } catch (err) {
      toast.error("Error loading popular anime", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
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
        `${HomeApi}/meta/anilist/advanced-search?format=MOVIE`
      );
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data.results)) {
        setMovie((movie) => [...movie, ...data.results]);
      }else{
        toast.error("Error loading movies", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "dark",
        });
        console.log("Api down for movies")
      }
      setLoading(false);
    } catch (err) {
      toast.error("Error loading movies", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
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
      toast.error("Error loading top airing", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
      setLoading(false);
    }
  };
  // Fetch function call
  useEffect(() => {
    if (!renderAfterCalled.current) {
      getAnime(1);
      getPropular();
      // getDub();
      getMovie();
      getTopAiring();
    }
    renderAfterCalled.current = true;
  }, []);

  // Search Bar function
  const handelChanges = async (val) => {
    try {
      const searchRes = await axios
        .get(`${HomeApi}/meta/anilist/${val}`)
      if (val === "") {
        setSearchResult(null);
      } else {
        setSearchResult(searchRes.data);
        console.log(searchRes.data)
      }
    }
    catch (err) {
      console.log("Search failed")
      toast.error("Search Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
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
    getTopAiring(idxtop + 2);
    setIdxtop(idxtop + 2);
  }

  return (
    <Router className="App">
      <ToastContainer/>
      <ScrollToTop />
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
          path="/genre"
          element={
            <OptionFetcher
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

export default App;
