import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FiLogOut } from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
const Header = forwardRef((props, ref) => {
  const [togglemenu, setToggleMenu] = useState(true);

  const [searchActive, setSearchActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [img, setImg] = useState("https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg");

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })


  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
  }
  let profileRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setProfileActive(false);
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  let toggleref = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!toggleref.current.contains(e.target)) {
        setToggleMenu(true);
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  const getUser = async () => {
    const id = getCookie("id");
    const category = getCookie("category");
    setImg(getCookie("img"));
    if (id && id.length !== 0) {
      setIsLoggedIn(true);
    }
    if (category == "admin")
      setIsAdmin(true);
  }

  useEffect(() => {
    getUser();
    // console.log(userId);
  },);

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  function ProfileView() {
    setProfileActive(profileActive => !profileActive)
  }
  const ProfileOpen = profileActive ? 'active' : 'gay';
  function MobileView() {
    setSearchActive(!searchActive);
    scroll()
  }
  const [inputVal, setInputVal] = useState("");
  const handelChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    props.handelChanges(val);
  };

  useImperativeHandle(ref, () => ({
    emptySearch() {
      setInputVal("");
    },
  }));

  const closeMenuWhenClickedLink = () => {
    if (window.innerWidth <= 1300) {
      setToggleMenu(!togglemenu);
    }
  };

  const logout = (e) => {
    Cookies.remove("id");
    setIsLoggedIn(false);
    toast('Goodbye see you soon', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <ToastContainer />
      <nav className="header">
        <div className="logo">
          <NavLink to="/">
            <span className="white">Anime</span>{" "}
            <span className="blue">Trix</span>
          </NavLink>
        </div>

        <ul onClick={scroll} className={togglemenu ? "nav-links" : "toggle-links"} ref={toggleref}>
          <li>
            <NavLink to={"/"} onClick={() => closeMenuWhenClickedLink()}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/top-airing"} onClick={() => closeMenuWhenClickedLink()}>
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink to={"/movie"} onClick={() => closeMenuWhenClickedLink()}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to={"/genre"} onClick={() => closeMenuWhenClickedLink()}>
              Genres
            </NavLink>
          </li>
          {/*
          <li>
            <NavLink
              to={"/dub-anime"}
              onClick={() => closeMenuWhenClickedLink()}
            >
              Dub Anime
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/ai-chat"} onClick={() => closeMenuWhenClickedLink()}>
              ChatterBox
            </NavLink>
          </li>

          <li>
            <NavLink to={"/image-search"} onClick={() => closeMenuWhenClickedLink()}>
              AniScan
            </NavLink>
          </li>
        </ul>
        <div className="search">
          <input
            type="text"
            className="navbar-form-search"
            placeholder="I am looking for...."
            value={inputVal}
            onChange={handelChange}
          />
        </div>
        {!isLoggedIn ?
          <li className="login-tab">
            <NavLink to={"/login"}>
              <ion-icon name="log-in-outline"></ion-icon>
            </NavLink>
          </li>
          :

          <div className="account-login" onClick={ProfileView} ref={profileRef}>
            <img src={img} alt="user-image" className='login-img' />
            <div className={`extra-options ${ProfileOpen}`}>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/bookmark">
                <li>Bookmark</li>
              </Link>
              <Link to="/history">
                <li>History</li>
              </Link>
              {isAdmin ?
                <a href="http://localhost:3001"><li>Admin</li></a> : ""}
              <li onClick={e => { logout(e) }}>Logout</li>
            </div>
          </div>}
        <div className="mobile-search" ref={menuRef}>
          <div className="search-field">
            <input type="text" className={`active-search-mobile ${searchActive ? 'active' : ''}`} placeholder="I am looking for" value={inputVal} onChange={handelChange} />
            <div className="field-icon-search" onClick={MobileView}>
              <ion-icon name="search-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div
          className="toggle"
          onClick={() => {
            setToggleMenu(!togglemenu);
          }}
        >
          {togglemenu ? (
            <button className="navbar-menu-btn">
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </button>
          ) : (
            <div className="navbar-menu-btn active">
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
});
export default Header;
