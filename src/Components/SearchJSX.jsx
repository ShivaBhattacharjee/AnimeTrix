import React from "react";
import Card from "./Card";

export default function SearchJSX(props) {
  const handelClick = () => {
    props.handelClick();
  };
  return (
    <>
      {Object.keys(props.searchResult).length === 0 ? (
        <div align="center">
          <h4 className="no-results" style={{
            fontSize: "35px", paddingTop:"20px",
          }}>No Results found</h4>
          <br /><br />
        </div>
      ) : (
        <div align="center">
          <div className="search-grid" >
          {props.searchResult?.results?.map((rec) => (
            <Card rec={rec} key={rec.id} ep="false" handelClick={handelClick} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
