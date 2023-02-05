import React, { forwardRef, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";

// Import from Material UI
import SearchIcon from '@mui/icons-material/Search';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';

const Header = forwardRef((props, ref) => {
  
  const [togglemenu, setToggleMenu] = useState(true);

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

  return (
    <>
      <section className="header">
        <div className="logo">
          <NavLink to={'/'}>
            <span className="white">Anime</span> <span className="blue">Trix</span>
          </NavLink>
        </div>

        <div className="toggle" onClick={() => {setToggleMenu(!togglemenu)}}>
          {
            togglemenu ? <DensityMediumIcon  /> : <CloseIcon />
          }
        </div>

        <ul className={togglemenu ? "nav-links" : "toggle-links" } >
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/popular'}>Popular</NavLink>
          </li>
          <li>
            <NavLink to={'/top-airing'}>Top Airing</NavLink>
          </li>
          <li>
            <NavLink to={'/dub-anime'}>Dubbed Anime</NavLink>
          </li>
          <li>
            <NavLink to={'/movie'}>Movies</NavLink>
          </li>
          <li>
            <NavLink to={'/genre'}>Genres</NavLink>
          </li>
        </ul>

        <div className="search">
          <input type="text" className="navbar-form-search" placeholder="I am looking for...." value={inputVal} onChange={handelChange} />
          <button className="search-btn">
            <SearchIcon />
          </button>
        </div>
      </section>
    </>
  )
});
export default Header;
