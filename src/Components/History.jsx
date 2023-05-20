import { Link } from 'react-router-dom'
import { React,  useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeApi, ServerApi } from './constants';
import OtherPagesCard from '../Loading/OtherPagesCard';
import { showErrorToast, showSuccessToast } from '../utils/toast';
// const user = "Shiva";
function History() {
    const [animeData, setAnimeData] = useState([])
    const [userId, setUserId] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
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
    };
    const getHistory = async () => {
        try {
            if (userId) {
                axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    showErrorToast( error.response.data.error);
                    return;
                });
                const res = await axios.get(`${ServerApi}/user/history/${userId}`)
                const history = res.data.history;
                setHistory(history);

                const animeDataPromises = history.map(async (historyItem) => {
                    const animeRes = await axios.get(`${HomeApi}/meta/anilist/info/${historyItem.animeId}`);
                    return animeRes.data;
                });

                const animeDataArray = await Promise.all(animeDataPromises);

                setAnimeData(animeDataArray);
                setLoading(false);
            }
        } catch (err) {
            showErrorToast('Error loading History!');
        }
    }

    const deleteHistory = async () => {
        try {
            const conf = window.confirm("Are you sure you want to delete your history?");
            if (conf) {
                axios.interceptors.response.use(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        showErrorToast(error.response.data.error);
                        return;
                    }
                );
                const res = await axios.delete(
                    `${ServerApi}/user/history/${userId}`
                );
                await getHistory();
                if (res && res.data) {
                    showSuccessToast(res.data.message);
                    return res;
                }
            }
        } catch (err) {
            console.log(err);
            showErrorToast('Something went wrong');
        }
    };

    const removeHistory = async (animeId) => {
        try {
            const conf = window.confirm("Are you sure you want to delete your history?");
            if (conf) {
                axios.interceptors.response.use(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        showErrorToast(error.response.data.error);
                        return;
                    }
                );
                const res = await axios.delete(
                    `${ServerApi}/user/single/history/${userId}/${animeId}`
                );
                await getHistory();
                if (res && res.data) {
                    showSuccessToast(res.data.message);
                    return res;
                }
            }
        } catch (err) {
            console.log(err);
            showErrorToast('Something went wrong');
        }
    }

    useEffect(() => {
        const id = getCookie("id");
        setUserId(id);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        getHistory();
    }, [userId]);
    return (
        <>
            <ToastContainer />
            {loading ? (
                <>
                    <section className='profile-wrapper'>
                        <div className="profile-greeting">
                            <h1 className='history-head'><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                        </div>
                        <div className='profile-navbar'>
                            <ul>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <li style={{ cursor: "pointer" }}>History</li>
                                <Link to="/bookmark">
                                    <li>Bookmark</li>
                                </Link>
                            </ul>
                        </div>
                    </section>
                    <OtherPagesCard />
                </>
            ) : (
                <>
                    <section className='profile-wrapper'>
                        <div className="profile-greeting">
                            {/* <h1> Hi, {user}</h1> */}
                            <h1 className='history-head'><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                        </div>
                        <div className='profile-navbar'>
                            <ul>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <li style={{ cursor: "pointer" }}>History</li>
                                <Link to="/bookmark">
                                    <li>Bookmark</li>
                                </Link>
                            </ul>
                        </div>
                    </section>
                    <div className="lastwatch active">
                        <section className="movies">
                            <div className="lastwatch-bar">
                                <div className="lastwatch-heading">
                                    {history.length == 0 ? "" : <div className="clear-history">
                                        <button onClick={deleteHistory}>Clear all</button>
                                    </div>}
                                    {history.length == 0 ? <h1>No History</h1> : ""}
                                    <div className="movies-grid">
                                        {animeData?.slice(0, count).map((animeDataHis, index) => {
                                            return (
                                                <div className="movie-card">
                                                    <div className="lastwatch-close" onClick={ev => removeHistory(history[index].animeId)}>

                                                        <i
                                                            className="fa-solid fa-xmark"
                                                        />
                                                    </div>
                                                    <div className="card-head">
                                                        <Link to={`/watch/${history[index].epId}/${history[index].animeId}`}>
                                                            <img src={animeDataHis?.image} alt="its just an images" className="card-img" />
                                                        </Link>
                                                        <div className="card-details">
                                                            <h5 className="card-title">
                                                                {animeDataHis.title?.userPreferred || animeDataHis.title?.english || animeDataHis.romaji}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div >
                                            )
                                        })}
                                    </div>
                                    {history.length > 18 && (
                                        <div className="loadmore-recent">
                                            {history.length == 40 && (
                                                <button className="loadmore" onClick={handleViewMoreClick}>
                                                    View More
                                                </button>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </section >

                    </div >
                </>
            )}
        </>
    );
};

export default History;
