import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Error404() {
    return (
        <>
            <Helmet>
                <title>Error 404 could not find the page</title>
            </Helmet>
            <section className="error-page">
                <div className="error-background">
                    <h1>404</h1>
                </div>
                <div className="error-texts">
                    <span className="top-error-heading">Welcome to <span>the 404 dimension</span></span>
                    <h1 className="error-description">You have discovered a new dimension</h1>
                    <span className="bottom-error-heading">But unfortunately, this dimension has nothing at all</span>
                    <Link to="/">
                    <button>Go back to the old dimension</button>
                    </Link>
                </div>
            </section>
        </>
    )
}
export default Error404;
