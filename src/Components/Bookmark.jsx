import { Link, useNavigate } from 'react-router-dom'
import { React, useDebugValue, useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Card';
import { ServerApi } from './constants';

const Bookmark = () => {
    const [animeData, setAnimeData] = useState([])
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [bookmark, setBookmark] = useState([]);

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
        getBookmarks();
    }, [userId]);


    const getBookmarks = async () => {
        try {
            if (userId) {
                axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    toast.error(error.response.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return;
                });
                const res = await axios.get(`${ServerApi}/user/bookmark/${userId}`)
                const bookmark = res.data;
                // console.log(bookmark);
                setBookmark(bookmark);

                const animeDataArray = [];
                for (const bookmarkItem of bookmark) {
                    const animeRes = await axios.get(`https://animetrix-api.vercel.app/meta/anilist/info/${bookmarkItem}`);
                    // console.log(animeRes.data);
                    const animeDataItem = animeRes.data;
                    animeDataArray.push(animeDataItem);
                }
                setAnimeData(animeDataArray);
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            toast.error('Error loading bookmark!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <ToastContainer />
            {loading ? (
                <div className="spinner-box">
                    <div className="configure-border-1">
                        <div className="configure-core"></div>
                    </div>
                    <div className="configure-border-2">
                        <div className="configure-core"></div>
                    </div>
                </div>
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
                                        {animeData?.slice(0, 18).reverse().map((animeDataHis, index) => {
                                            return (
                                                <Card rec={animeDataHis} removeBookmark={removeBookmark} />
                                            )
                                        })}
                                    </div>
                                    {bookmark.length > 18 ? <div className="loadmore-recent">
                                        <button className="loadmore">View More</button>
                                    </div> : ""}
                                </div>
                            </div>
                        </section>

                    </div>
                </>)}
        </>
    )
}

export default Bookmark