import { Link } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Card';
import { ServerApi } from './constants';
import OtherPagesCard from '../Loading/OtherPagesCard';
import { showErrorToast } from '../utils/toast';
const Bookmark = () => {
    const [animeData, setAnimeData] = useState([])
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [bookmark, setBookmark] = useState([]);
    const [count, setCount] = useState(18);

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return undefined;
    }
    const handleViewMoreClick = () => {
        setCount(count + 18);
        if (count >= 40) {

        }
    };
    const removeBookmark = (animeId) => {
        const newArray = bookmark.filter(item => item != animeId);
        const newAnimeData = animeData.filter(data => data.id != animeId);
        setAnimeData(newAnimeData);
        setBookmark(newArray);
    }

    useEffect(() => {
        const id = getCookie("id");
        setUserId(id);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        getBookmarks();
    }, [userId]);


    const getBookmarks = async () => {
        try {
            if (userId) {
                axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    showErrorToast(error.response.data.error);
                    return;
                });
                const res = await axios.get(`${ServerApi}/user/bookmark/${userId}`);
                const bookmark = res.data;
                setBookmark(bookmark);

                const animeDataArray = await Promise.all(bookmark.map(async (bookmarkItem) => {
                    const animeRes = await axios.get(`https://animetrix-api.vercel.app/meta/anilist/info/${bookmarkItem}`);
                    return animeRes.data;
                }));

                setAnimeData(animeDataArray);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            showErrorToast('Error loading Bookmark!');
        }
    }
    return (
        <>
            <ToastContainer />
            {loading ? (
                <>
                    <section className='profile-wrapper'>
                        <div className="profile-greeting">
                            {/* <h1> Hi, {user}</h1> */}
                            <h1><i class="fa-solid fa-bookmark continue-icon"></i> Bookmarks</h1>
                        </div>
                        <div className='profile-navbar'>
                            <ul>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <Link to="/history"><li>History</li></Link>
                                <li style={{ cursor: "pointer" }}>Bookmark</li>
                            </ul>
                        </div>
                    </section>
                    <OtherPagesCard />
                </>
            )
                : (<>
                    <section className='profile-wrapper'>
                        <div className="profile-greeting">
                            {/* <h1> Hi, {user}</h1> */}
                            <h1><i class="fa-solid fa-bookmark continue-icon"></i> Bookmarks</h1>
                        </div>
                        <div className='profile-navbar'>
                            <ul>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <Link to="/history"><li>History</li></Link>
                                <li style={{ cursor: "pointer" }}>Bookmark</li>
                            </ul>
                        </div>
                    </section>
                    <div className="lastwatch active">
                        <section className="movies">
                            <div className="lastwatch-bar">
                                <div className="lastwatch-heading">
                                    {/* <h1><i class="fa-solid fa-bookmark continue-icon"></i> Bookmarks</h1> */}
                                    {bookmark.length == 0 ? <h1>No bookmark</h1> : ""}
                                    <div className="movies-grid">
                                        {animeData?.slice(0, count).reverse().map((animeDataHis, index) => {
                                            return (
                                                <Card rec={animeDataHis} removeBookmark={removeBookmark} />
                                            )
                                        })}
                                    </div>
                                    {bookmark.length > 18 ? <div className="loadmore-recent">
                                        <button className="loadmore" onClick={handleViewMoreClick}>View More</button>
                                    </div> : null}
                                </div>
                            </div>
                        </section>

                    </div>
                </>)}
        </>
    )
}

export default Bookmark