import React, { forwardRef, useImperativeHandle, useState } from "react";

const Header = forwardRef((props, ref) => {
  const navList = [
    {
      id: 1,
      text: "Home",
      to: "/",
    },
    {
      id: 2,
      text: "Popular",
      to: "/popular",
    },
    {
      id: 5,
      text: "Top-Airing",
      to: "/top-airing"
    },
    {
      id: 3,
      text: "Dub-Anime",
      to: "/dub-anime",
    },
    {
      id: 4,
      text: "Movies",
      to: "/movie",
    },
    {
      id: 5,
      text : "Genres",
      to: "/genre"
    }
  ];
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
    <div className="container">
      <header>
        <div className="navbar">
          <button className="navbar-menu-btn ">
            <span className="one"></span>
            <span className="two"></span>
            <span className="three"></span>
          </button>
          <a href="/" className="navbar-brand">Anime<span>Trix</span></a> 
          <nav>
            <ul className="navbar-nav">
              {navList.map((list) => (
                <li key={list.to}>
                  <a href={list.to} >
                    {list.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <div className="navbar-form">
              <input type="text" className="navbar-form-search" placeholder="I am looking for...." value={inputVal} onChange={handelChange} />
              <button className="navbar-form-btn">
                <ion-icon name="search-outline"></ion-icon>
              </button>
              <button className="navbar-form-close" type="submit">
                <ion-icon name="close-circle-outline"></ion-icon>
              </button>
            </div>

            <button className="navbar-search-btn">
              <ion-icon name="search-outline"></ion-icon>
            </button>

          </div>
        </div>
      </header>
    </div>
  )
});
export default Header;
