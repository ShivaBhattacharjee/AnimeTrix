import React from "react";
const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
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
            <div className="footer-icon">

              <div className="footer-social github" onClick={() => openInNewTab("https://github.com/ShivaBhattacharjee/AnimeTrix")}>
                <i class="fa-brands fa-github"></i>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default Footer;