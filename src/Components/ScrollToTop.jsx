import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const goToBtn = () => {
        window.scrollTo({ top:0, left: 0, behavior: "smooth" })
    }

    const listenToScroll = () => {
        let hidden = 500
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > hidden) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, [])
    return (
        <>
            {
                isVisible && (
                    <div className='top-scroll' onClick={goToBtn}>
                        <div className="top-scroll-icon">
                        <i class="fa-solid fa-angles-up"></i>
                        </div>
                    </div>
                )
            }

        </>

    )
}

export default ScrollToTop