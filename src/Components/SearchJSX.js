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
          <br /><br /><br /><br /> <br /><br />
          <h4 className="no-results"
          >
            No Results found
          </h4>
        </div>
      ) : (
        <div align="center">
          <h4 className="green mt-3 fw-bold" style={{ fontFamily: "Poppins" }}>
            SEARCH RESULT
          </h4>
          <br /><br /><br />
          <div className="movies-grid" >
            {props.searchResult?.map((rec) => (
              <Card rec={rec} key={rec.animeId} ep="false" handelClick={handelClick} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
