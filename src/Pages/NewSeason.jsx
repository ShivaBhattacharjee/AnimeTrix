import React from 'react'
import { useRef } from 'react'
import spinner from "../img/spinner.svg";
import { Card } from '../Components';
import InfiniteScroll from "react-infinite-scroll-component";
import OtherPagesCard from "../Loading/OtherPagesCard";
import { useFetchInitialData } from "../utils/hooks";
const NewSeason = (props) => {
    const ref = useRef(null);
    const handelClick = () => {
        props.handelClick();
    };
    const { loading, recent,loadmoreUpload } = props;

    const loadMore = () => {
        props.loadmoreUpload();
    };

    useFetchInitialData(loading, recent, loadmoreUpload, ref, window);

    return (
        <>
            {Object?.keys(recent).length === 0 ? (
                  <OtherPagesCard title="Recent Anime"/>
            ) : (
                <>
                    <section className="movies">
                        <div className="filter-bar">
                            <div className="heading">
                                <h3>Recent Anime</h3>
                            </div>
                        </div>
                        <div className="movies-grid" ref={ref}>
                            {recent.map((rec) => (
                                <Card rec={rec} key={rec.id} handelClick={handelClick} />
                            ))}
                        </div>
                        <InfiniteScroll
                            dataLength={recent.length}
                            next={loadMore}
                            hasMore={true}
                            loader={<img src={spinner} alt="spinner" className="spinner" />}
                        ></InfiniteScroll>
                    </section>
                </>
            )}
        </>
    );
};

export default NewSeason;
