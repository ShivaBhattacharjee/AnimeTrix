import React from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">

          <div className="footer-about">
            <h3><span>Anime</span><span className="about-blue">Trix</span></h3>
            <p>AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only an user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.</p>
          </div>
        <div className="join-social">
        <a href="https://github.com/ShivaBhattacharjee/AnimeTrix/" target={"_blank"}><ion-icon name="logo-github" ></ion-icon></a>
        </div>
        </div>
      </div>
    </>
  )
}
export default Footer;