import React from "react";
import { Helmet } from "react-helmet";
import LoadingBar from 'react-top-loading-bar';
import error from "../img/error.png";
const open = url => {
    window.open(url)
}
const openInNewTab = url => {
    window.open(url)
}
function Error404() {
    return (
        <section className="Error">
            <div className="error-container">
                <div className="img">
                    <img src={error} alt="error-vector" />
                </div>
                <div className="text-field">
                    <h1>404</h1>
                    <span>Looks like you are lost</span>
                    <span>The page you are looking for could not be found</span>
                    <button onClick={() => open("/")}>Home</button>
                </div>
            </div>
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-icons">
                        <i className="fa-brands fa-telegram"></i>
                        <i className="fa-brands fa-discord" onClick={() => openInNewTab("https://discord.gg/rap6A2TYds")}></i>
                        <i className="fa-brands fa-github" onClick={() => openInNewTab("https://github.com/ShivaBhattacharjee/betaanime.git")}></i>
                    </div>
                    <h3>Anime <span>Trix</span></h3>
                    <p>AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only an user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access . AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant</p>
                </div>
            </div>
        </section>

    )
}
export default Error404;