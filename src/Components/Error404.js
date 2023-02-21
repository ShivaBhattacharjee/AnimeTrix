import React from "react";
import error from "../img/error.png";
import Footer from "./Footer"
import { Link } from "react-router-dom";

function Error404() {
    return (
        <>
            <section className="error">
                <div className="error-container">
                    <div className="error-img">
                        <img src={error} alt="error-vector" />
                    </div>
                    <div className="error-text-field">
                        <h1>404</h1>
                        <span>Looks like you are lost</span>
                        <span>The page you are looking for could not be found</span>
                        <Link to={'/'}>Homepage</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Error404;