import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";


const Header = forwardRef((props, ref) => {
  const [togglemenu, setToggleMenu] = useState(true);

  const [searchActive, setSearchActive] = useState(false);

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

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
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

  return (
    <>
      <nav className="header">
        <div className="logo">
          <NavLink to={"/"}>
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
            <NavLink to={"/popular"} onClick={() => closeMenuWhenClickedLink()}>
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dub-anime"}
              onClick={() => closeMenuWhenClickedLink()}
            >
              Dub Anime
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
        </ul>
        <div className="search">
          <input
            type="text"
            className="navbar-form-search"
            placeholder="I am looking for...."
            value={inputVal}
            onChange={handelChange}
          />
          <button className="search-btn">
            {/* <SearchIcon /> */}
          </button>
        </div>

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