import React from "react";
import Card from "./Card";
import { useEffect } from "react";
export default function SearchJSX(props) {
  const handelClick = () => {
    props.handelClick();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {Object.keys(props.searchResult).length === 0 ? (
        <div align="center">
          <h4 className="no-results" style={{
            fontSize: "35px", paddingTop: "20px",
          }}>No Results found</h4>
          <br /><br />
        </div>
      ) : (
        <div align="center">
          {
            window.innerWidth > 600 ? null :<> <br /><br /><br /></>
          }

          <div className="movies-grid" >
            {props.searchResult?.results?.map((rec) => (
              <Card rec={rec} key={rec.id} ep="false" handelClick={handelClick} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
