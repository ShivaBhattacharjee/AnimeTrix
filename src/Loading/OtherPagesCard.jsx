import React from 'react'
import Skeleton from 'react-loading-skeleton';
const OtherPagesCard = (props) => {
    const { title } = props
    return (
        <section className="movies">
            <div className="filter-bar">
                <div className="heading">
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="movies-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(() => {
                    return (
                        <div
                            className="movie-card" >
                            <Skeleton className="card-img" />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default OtherPagesCard