import React, { useEffect } from "react";
import Card from "./Card";
import OtherPagesCard from "../Loading/OtherPagesCard";

export default function SearchJSX(props) {
  const handelClick = () => {
    props.handelClick();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!props.searchResult || Object.keys(props.searchResult).length === 0) {
    return (
      <div align="center">
        <OtherPagesCard/>
        <br />
      </div>
    );
  }
  return (
    <div align="center">
      <h1>Search Results</h1>
      <div className="movies-grid">
        {props.searchResult.results.map((rec) => (
          <Card
            rec={rec}
            key={rec.id}
            ep="false"
            handelClick={handelClick}
          />
        ))}
      </div>
      <br /><br />
    </div>
  );
}
